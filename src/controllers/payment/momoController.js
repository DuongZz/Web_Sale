import crypto from "crypto";
import axios from "axios";
import { momoConfig } from "~/config/momoConfig.js";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { findOrderById } from "~/models/orderModel";
import { updateOrder } from "~/models/orderModel";

export const initiatePaymentMomo = async (req, res, next) => {
  const id = req.body.id;
  const preOrder = await findOrderById(id);
  console.log("🚀 ~ initiatePaymentMomo ~ preOrder:", preOrder);
  if (!preOrder) next(new ApiError(StatusCodes.NOT_FOUND, "Not Found Order"));

  const transactorName = preOrder.name;
  const totalAmount = preOrder.totalAmount;
  const orderId = preOrder._id;
  const requestId = orderId;

  momoConfig.amount = totalAmount;

  const {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    amount,
    autoCapture,
    extraData,
    lang,
  } = momoConfig;

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: transactorName,
    storeId: "MomoTestStore",
    requestId,
    amount: totalAmount,
    orderId: orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    signature,
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error(
      "MoMo API Error:",
      error.response ? error.response.data : error.message
    );
    return res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
};

export const handleMomoIPN = async (req, res) => {
  try {
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = req.body;

    // Xác thực chữ ký
    const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
    const computedSignature = crypto
      .createHmac("sha256", momoConfig.secretKey)
      .update(rawSignature)
      .digest("hex");

    if (signature !== computedSignature) {
      console.error("Chữ ký không hợp lệ");
      return res.status(400).json({ error: "Chữ ký không hợp lệ" });
    }

    // Kiểm tra resultCode để xem thanh toán có thành công hay không
    if (resultCode === 0) {
      // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu của bạn
      await updateOrder(orderId, {
        isPaided: true,
        updateAt: new Date(),
      });
      console.log(`Đơn hàng ${orderId} đã được thanh toán thành công`);
    } else {
      console.log(
        `Thanh toán đơn hàng ${orderId} thất bại với mã lỗi: ${resultCode}`
      );
    }

    return res.status(200).json({ message: "IPN nhận thành công" });
  } catch (error) {
    console.error("Lỗi xử lý IPN:", error);
    return res.status(500).json({ error: error.message });
  }
};

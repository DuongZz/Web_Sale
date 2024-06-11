import axios from "axios";
import moment from "moment";
const CryptoJS = require("crypto-js");
import { env } from "~/config/environment";
import { findOrderById, updateOrder } from "~/models/orderModel";
import zaloConfig from "~/config/zaloPayConfig";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import genRandomString from "~/utils/genRandomString.js";
export const createPaymentWithZalo = async (req, res, next) => {
  try {
    const id = req.body.id;
    const preOrder = await findOrderById(id);
    if (!preOrder) next(new ApiError(StatusCodes.NOT_FOUND, "Not Found Order"));
    const embed_data = {
      //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
      redirecturl: `${env.REACT_GEARVN_CLONE_HOST}/payment-success?id=${preOrder._id}`,
    };

    const items = preOrder.product;
    const transID = preOrder._id;

    const order = {
      app_id: zaloConfig.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}_${genRandomString(
        5
      )}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: preOrder.name,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: preOrder.totalAmount,
      //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
      //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
      callback_url: env.ZALO_CALLBACK,
      description: `GearVN - Payment for the order #${transID}`,
      bank_code: "",
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      zaloConfig.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, zaloConfig.key1).toString();
    const result = await axios.post(zaloConfig.endpoint, null, {
      params: order,
    });

    res.status(StatusCodes.OK).json(result.data);
  } catch (error) {
    next(error);
  }
};

export const zaloCallback = async (req, res) => {
  let result = {};
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, zaloConfig.key2).toString();

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công

      let dataJson = JSON.parse(dataStr, zaloConfig.key2);
      const id = dataJson["app_trans_id"].split("_")[1];
      console.log("orderId", id);
      // merchant cập nhật trạng thái cho đơn hàng ở đây
      await updateOrder(id, {
        isPaided: true,
        updateAt: new Date(),
      });
      console.log(`Đơn hàng đã được thanh toán thành công`);
      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    console.log("lỗi:::" + ex.message);
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
};

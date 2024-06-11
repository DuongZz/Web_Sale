import { env } from "./environment";
export const momoConfig = {
  accessKey: env.MOMO_ACCESS_KEY, //MOMO cung cấp mã riêng
  secretKey: env.MOMO_SECRET_KEY, //MOMO cung cấp mã riêng
  orderInfo: "Thanh toán với MOMO",
  partnerCode: "MOMO",
  redirectUrl: env.REDIRECT_URL_MOMO,
  ipnUrl: env.IPN_URL_MOMO,
  requestType: "payWithMethod",
  amount: "",
  extraData: "",
  autoCapture: true,
  lang: "vi",
};

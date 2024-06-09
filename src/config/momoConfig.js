import { env } from "./environment";
export const momoConfig = {
  accessKey: env.MOMO_ACCESS_KEY, //MOMO cung cấp mã riêng
  secretKey: env.MOMO_SECRET_KEY, //MOMO cung cấp mã riêng
  orderInfo: "Thanh toán với MOMO",
  partnerCode: "MOMO",
  redirectUrl:
    "https://70ea-2405-4802-1c83-c640-710c-52b7-1f44-8244.ngrok-free.app",
  ipnUrl:
    "https://70ea-2405-4802-1c83-c640-710c-52b7-1f44-8244.ngrok-free.app/api/payment/momo-check",
  requestType: "payWithMethod",
  amount: "",
  extraData: "",
  autoCapture: true,
  lang: "vi",
};

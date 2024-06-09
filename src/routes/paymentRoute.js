import { Router } from "express";
import {
  createPaymentWithZalo,
  zaloCallback,
} from "~/controllers/payment/zaloController";
import {
  initiatePaymentMomo,
  handleMomoIPN,
} from "~/controllers/payment/momoController";

const router = Router();
//momo pay --------------------------------
router.post("/momo", initiatePaymentMomo);
router.post("/momo-check", handleMomoIPN);

//zalo pay --------------------------------

router.post("/zalo", createPaymentWithZalo);

/**
 * method: POST
 * description: callback để Zalopay Server call đến khi thanh toán thành công.
 * Khi và chỉ khi ZaloPay đã thu tiền khách hàng thành công thì mới gọi API này để thông báo kết quả.
 */
router.post("/zalo-callback", zaloCallback);

export default router;

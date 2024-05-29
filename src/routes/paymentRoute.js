import { Router } from "express";
import { createPaymentWithZalo, zaloCallback } from "~/controllers/payment/zaloController";

const router = Router();

//zalo pay --------------------------------

router.post("/zalo", createPaymentWithZalo);

/**
 * method: POST
 * description: callback để Zalopay Server call đến khi thanh toán thành công.
 * Khi và chỉ khi ZaloPay đã thu tiền khách hàng thành công thì mới gọi API này để thông báo kết quả.
 */
router.post("/zalo-callback", zaloCallback)

export default router;

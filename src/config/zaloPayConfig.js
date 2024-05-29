import { env } from "./environment";

const zaloConfig = {
  app_id: env.ZALO_API_KEY,
  key1: env.ZALO_KEY_1,
  key2: env.ZALO_KEY_2,
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

export default zaloConfig;

import { env } from "./environment";

const zaloConfig = {
  app_id: env.ZALO_API_KEY,
  key1: env.ZALO_KEY_1,
  key2: env.ZALO_KEY_2,
  endpoint: env.ZALO_ENDPOINT,
};

export default zaloConfig;

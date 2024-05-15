import Joi from "joi";
import { typeDevice } from "~/enum/typeDevice";

const PROMOTION_COLLECTION_NAME = "promotion-policys";
const PROMOTION_COLLECTION_SCHEMA = Joi.object({
  typeDevice: Joi.string()
    .valid(...typeDevice)
    .trim()
    .strict(),
  description: Joi.string().trim().strict(),
});

export const promotionModel = {
  PROMOTION_COLLECTION_NAME,
  PROMOTION_COLLECTION_SCHEMA,
};

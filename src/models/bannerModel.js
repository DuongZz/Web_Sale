import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const BANNER_COLLECTION_NAME = "banners";
const BANNER_COLLECTION_SCHEMA = Joi.object({
  productId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).trim().strict(),
  imageURL: Joi.array().items(Joi.string().required().trim().strict()).default([]),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  createAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const bannerModel = {
  BANNER_COLLECTION_NAME,
  BANNER_COLLECTION_SCHEMA,
};



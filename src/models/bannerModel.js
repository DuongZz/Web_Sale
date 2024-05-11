import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { position } from "~/enum/typeDevice";
const BANNER_COLLECTION_NAME = "banner";
const BANNER_COLLECTION_SCHEMA = Joi.object({
  _id: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  position: Joi.string()
    .valid(...position)
    .trim()
    .strict(),
  imageURL: Joi.string().required().trim().strict(),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  createAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const bannerModel = {
  BANNER_COLLECTION_NAME,
  BANNER_COLLECTION_SCHEMA,
};

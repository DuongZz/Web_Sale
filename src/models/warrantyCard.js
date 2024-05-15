import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const WARRANTY_COLLECTION_NAME = "warrantyCards";
const WARRANTY_COLLECTION_SCHEMA = Joi.object({
  orderId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).trim().strict(),
  imageURL: Joi.string().required().trim().strict(),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  createAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const warrantyModel = {
  WARRANTY_COLLECTION_NAME,
  WARRANTY_COLLECTION_SCHEMA,
};

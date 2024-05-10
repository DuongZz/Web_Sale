import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const ORDER_COLLECTION_NAME = "orders";
const ORDER_COLLECTION_SCHEMA = Joi.object({
  _id: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  userId: Joi.string().required().trim().strict(),
  staffId: Joi.string().required().trim().strict(),
  product: Joi.array().items({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
  status: Joi.string().valid("pending", "processing", "completed"),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  createAt: Joi.date().timestamp("javascript").default(null),
});

export const orderModel = {
  ORDER_COLLECTION_NAME,
  ORDER_COLLECTION_SCHEMA,
};

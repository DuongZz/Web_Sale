import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const STAFF_COLLECTION_NAME = "staff";
const STAFF_COLLECTION_SCHEMA = Joi.object({
  _id: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  username: Joi.string().required().min(8).max(20).trim().strict(),
  name: Joi.string().required().min(5).max(20).trim().strict(),
  staffCode: Joi.string().required().min(5).max(10).trim().strict(),
  password: Joi.string().required().min(5).max(20).trim().strict(),
  orderId: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
});

export const staffModel = {
  STAFF_COLLECTION_NAME,
  STAFF_COLLECTION_SCHEMA,
};

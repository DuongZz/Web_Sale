import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { role } from "~/enum/typeDevice";

const USER_COLLECTION_NAME = "user";
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().min(8).max(20).trim().strict(),
  name: Joi.string().min(5).max(20).trim().strict(),
  email: Joi.string().email().trim().strict(),
  password: Joi.string().min(5).max(20).trim().strict(),
  address: Joi.string().min(5).max(100).trim().strict(),
  phone: Joi.string().min(10).max(15).trim().strict(),
  role: Joi.string()
    .valid(...role)
    .trim()
    .strict(),
  orderId: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  accessToken: Joi.string().trim().strict(),
  refreshToken: Joi.string().trim().strict(),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
});

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
};

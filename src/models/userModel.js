import Joi, { options } from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "~/config/mongodb";
import { checkUnique } from "~/utils/checkUnique";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const USER_COLLECTION_NAME = "users";
const USER_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(5).max(20).trim().strict(),
  email: Joi.string().required().email().trim().strict().external(async (email)=> {
    const isUse = await checkUnique(USER_COLLECTION_NAME, "email", email)
    if (isUse) {
      throw new Error("Email is already in use!")
    } 
    return email
  }),
  password: Joi.string().required().trim().strict(),
  phone: Joi.string().trim().strict(),
  role: Joi.string().default('user'),
  accessToken: Joi.string().trim().strict(),
  refreshToken: Joi.string().trim().strict(),
  orderId: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).trim().strict())
    .default([]),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
});

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
};

const validataBeforeCreate = async (data) => { 
  try {
    return await USER_COLLECTION_SCHEMA.validateAsync(data , { abortEarly: false})
  } catch (error) {
    throw new Error(error)
  }
}

export const createUser = async (data) => {
  try {
    const validatedData = await validataBeforeCreate(data)
    return await getDB()
      .collection(USER_COLLECTION_NAME)
      .insertOne(validatedData);
  } catch (error) {
    throw new Error(error)
  }
}

export const findUserById = async (id) => {
  try {
    return await getDB()
      .collection(USER_COLLECTION_NAME)
      .findOne({_id: new ObjectId(id)}, { projection: { password: 0 } });
  } catch (error) {
    throw new Error(error)
  }
}

export const findUserByEmail = async (email) => {
  try {
    return await getDB()
      .collection(USER_COLLECTION_NAME)
      .findOne({email});
  } catch (error) {
    throw new Error(error)
  }
}

export const updateUser = async (filter, doc, options) => { 
  try {
    return await getDB()
      .collection(USER_COLLECTION_NAME)
      .updateOne(filter, doc, options);
  } catch (error) {
    throw new Error(error)
  }
}
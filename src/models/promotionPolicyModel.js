import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "~/config/mongodb";
import { typeDevice } from "~/enum/typeDevice";

const PROMOTION_COLLECTION_NAME = "promotion-policys";
const PROMOTION_COLLECTION_SCHEMA = Joi.object({
  typeDevice: Joi.string()
    .valid(...typeDevice)
    .trim()
    .strict(),
  description: Joi.string().trim().strict(),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  updateAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const promotionModel = {
  PROMOTION_COLLECTION_NAME,
  PROMOTION_COLLECTION_SCHEMA,
};

const validataBeforeCreate = async (data) => {
  try {
    return await PROMOTION_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
  } catch (error) {
    throw error;
  }
};

export const createPromotionPolicy = async (data) => {
  try {
    const validatedData = await validataBeforeCreate(data);
    return await getDB()
      .collection(PROMOTION_COLLECTION_NAME)
      .insertOne(validatedData);
  } catch (error) {
    throw error;
  }
};

export const findPromotionPolicyById = async (id) => {
  try {
    return await getDB()
      .collection(PROMOTION_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw error;
  }
};

export const getPromotionPolicy = async (query) => {
  try {
    return await getDB()
      .collection(PROMOTION_COLLECTION_NAME)
      .find(query)
      .toArray();
  } catch (error) {
    throw error;
  }
};

export const updatePromotionPolicy = async (filter, doc, options) => {
  try {
    return await getDB()
      .collection(PROMOTION_COLLECTION_NAME)
      .updateOne(filter, doc, options);
  } catch (error) {
    throw error;
  }
};

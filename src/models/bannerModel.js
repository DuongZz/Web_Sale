import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "~/config/mongodb";
import { bannerPosition } from "~/enum/typeDevice.js";
const BANNER_COLLECTION_NAME = "banners";
const BANNER_COLLECTION_SCHEMA = Joi.object({
  imageURL: Joi.string().required().trim().strict(),
  position: Joi.string()
    .required()
    .trim()
    .strict()
    .valid(...bannerPosition),
  color: Joi.string().trim().strict().default(''),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  updateAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const bannerModel = {
  BANNER_COLLECTION_NAME,
  BANNER_COLLECTION_SCHEMA,
};

const validataBeforeCreate = async (data) => {
  try {
    return await BANNER_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
  } catch (error) {
    throw error;
  }
};

export const createBanner = async (data) => {
  try {
    const validatedData = await validataBeforeCreate(data);
    return await getDB()
      .collection(BANNER_COLLECTION_NAME)
      .insertOne(validatedData);
  } catch (error) {
    throw error;
  }
};

export const findBannerById = async (id) => {
  try {
    return await getDB()
      .collection(BANNER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw error;
  }
};

export const getBanner = async (query, limit) => {
  try {
    if (limit !== -1)
      return await getDB()
        .collection(BANNER_COLLECTION_NAME)
        .find(query)
        .limit(limit)
        .toArray();
    else
      return await getDB()
        .collection(BANNER_COLLECTION_NAME)
        .find(query)
        .toArray();
  } catch (error) {
    throw error;
  }
};

export const updateBanner = async (filter, doc, options) => {
  try {
    return await getDB()
      .collection(BANNER_COLLECTION_NAME)
      .updateOne(filter, doc, options);
  } catch (error) {
    throw error;
  }
};

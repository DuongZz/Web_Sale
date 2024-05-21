import Joi from "joi";
import { generateSlug } from "~/utils/generateSlug";
import { typeDevice } from "~/enum/typeDevice";
import { getDB } from "~/config/mongodb";
import { ObjectId } from "mongodb";

const PRODUCT_COLLECTION_NAME = "products";
const PRODUCT_COLLECTION_SCHEMA = Joi.object({
  deviceCode: Joi.string().required().trim().strict(),
  name: Joi.string().required().trim().strict(),
  price: Joi.number().required().strict(),
  stock: Joi.number().required().strict(),
  information: Joi.string().trim().strict(),
  techSpecification: Joi.object({
    CPU: Joi.string(),
    RAM: Joi.string(),
    storage: Joi.string(),
    graphicCard: Joi.string(),
    display: Joi.string(),
    ports: Joi.string(),
    audio: Joi.string(),
    keyboard: Joi.string(),
    cardReader: Joi.string(),
    wifiStandard: Joi.string(),
    bluetooth: Joi.string(),
    webcam: Joi.string(),
    operatingSystem: Joi.string(),
    battery: Joi.string(),
    weight: Joi.string(),
    color: Joi.string(),
    dimensions: Joi.string(),
  }),
  brand: Joi.string().required().trim().strict(),
  discount: Joi.number().required().strict(),
  typeDevice: Joi.string()
    .valid(...typeDevice)
    .required()
    .trim()
    .strict(),
  rate: Joi.string().trim().strict(),
  rateScore: Joi.number().strict(),
  image: Joi.string(),
  year: Joi.number().required().strict(),
  sold: Joi.number().required().strict(),
  warranty: Joi.string().trim().strict(),
  slug: Joi.string().custom(generateSlug),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  updateAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const productModel = {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTION_SCHEMA,
};

const validataBeforeCreate = async (data) => {
  try {
    return await PRODUCT_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (data) => {
  try {
    const validatedData = await validataBeforeCreate(data);
    return await getDB()
      .collection(PRODUCT_COLLECTION_NAME)
      .insertOne(validatedData);
  } catch (error) {
    throw error;
  }
};

export const findProductById = async (id) => {
  try {
    return await getDB()
      .collection(PRODUCT_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw error;
  }
};

export const findAllProduct = async () => {
  try {
    return await getDB().collection(PRODUCT_COLLECTION_NAME).find().toArray();
  } catch (error) {
    throw new Error(error);
  }
};

export const findProductBySlug = async (slug) => {
  try {
    const db = getDB();
    const mainProduct = await db
      .collection(PRODUCT_COLLECTION_NAME)
      .findOne({ slug: slug });
    const relatedProducts = await db
      .collection(PRODUCT_COLLECTION_NAME)
      .find({
        brand: mainProduct.brand,
        _id: { $ne: mainProduct._id },
      })
      .limit(4)
      .toArray();

    return { mainProduct, relatedProducts };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findTopSaleProduct = async () => {
  try {
    return await getDB()
      .collection(PRODUCT_COLLECTION_NAME)
      .find()
      .sort({ sold: -1 })
      .limit(10)
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
};

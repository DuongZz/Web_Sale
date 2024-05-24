import Joi from "joi";
import { generateSlug } from "~/utils/generateSlug";
import { typeDevice } from "~/enum/typeDevice";
import { getDB } from "~/config/mongodb";
import { ObjectId } from "mongodb";

const PROMOTION_COLLECTION_NAME = "promotion-policys";
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
  rateQuan: Joi.number().strict(),
  rateSum: Joi.number().strict(),
  imageList: Joi.array().items(Joi.string().required()),
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
    const allProducts = await getDB()
      .collection(PRODUCT_COLLECTION_NAME)
      .find()
      .toArray();
    return { allProducts };
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
    const promotionPolicy = await db
      .collection(PROMOTION_COLLECTION_NAME)
      .findOne({ typeDevice: mainProduct.typeDevice });
    return { mainProduct, relatedProducts, promotionPolicy };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findProductByFilter = async (query, limit, sort) => {
  try {
    const db = getDB();
    const filteredProducts = await db
      .collection(PRODUCT_COLLECTION_NAME)
      .find(query)
      .limit(Number(limit) || 0)
      .sort(sort)
      .toArray();
    return filteredProducts;
  } catch (error) {
    throw error;
  }
};

import Joi from "joi";
import { generateSlug } from "~/utils/generateSlug";
import { typeDevice } from "~/enum/typeDevice";
import { getDB } from "~/config/mongodb";
import { ObjectId, ReturnDocument } from "mongodb";

const PROMOTION_COLLECTION_NAME = "promotion-policys";
const PRODUCT_COLLECTION_NAME = "products";
const PRODUCT_COLLECTION_SCHEMA = Joi.object({
  deviceCode: Joi.string().required().trim().strict(),
  name: Joi.string().required().trim().strict(),
  price: Joi.number().required().strict(),
  stock: Joi.number().required().strict(),
  information: Joi.string().trim().strict(),
  techSpecification: Joi.object({
    CPU: Joi.string().allow(null, ""),
    RAM: Joi.string().allow(null, ""),
    storage: Joi.string().allow(null, ""),
    graphicCard: Joi.string().allow(null, ""),
    display: Joi.string().allow(null, ""),
    ports: Joi.string().allow(null, ""),
    audio: Joi.string().allow(null, ""),
    keyboard: Joi.string().allow(null, ""),
    cardReader: Joi.string().allow(null, ""),
    wifiStandard: Joi.string().allow(null, ""),
    bluetooth: Joi.string().allow(null, ""),
    webcam: Joi.string().allow(null, ""),
    operatingSystem: Joi.string().allow(null, ""),
    battery: Joi.string().allow(null, ""),
    weight: Joi.string().allow(null, ""),
    color: Joi.string().allow(null, ""),
    dimensions: Joi.string().allow(null, ""),
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
      .find({ _destroy: false })
      .toArray();
    return allProducts;
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
        typeDevice: mainProduct.typeDevice,
        _id: { $ne: mainProduct._id },
      })
      .limit(4)
      .toArray();
    const promotionPolicy = await db
      .collection(PROMOTION_COLLECTION_NAME)
      .find({ typeDevice: mainProduct.typeDevice, _destroy: false })
      .toArray();
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

export const getProductFromStorage = async (id, quantity) => {
  try {
    return await getDB()
      .collection(PRODUCT_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $inc: {
            stock: -quantity, // Decrement the quantity by the specified amount
            sold: quantity, // Increment the sold by the specified amount
          },
        },
        { returnDocument: "after" }
      );
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (filter, doc, options) => {
  try {
    return await getDB()
      .collection(PRODUCT_COLLECTION_NAME)
      .updateOne(filter, doc, options);
  } catch (error) {
    throw error;
  }
};

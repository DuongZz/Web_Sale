import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const WARRANTY_COLLECTION_NAME = "warrantyCards";
const WARRANTY_COLLECTION_SCHEMA = Joi.object({
  orderId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .trim()
    .strict(),
  name: Joi.string().trim().strict().required(),
  email: Joi.string().trim().strict().required(),
  phone: Joi.string().trim().strict().required(),
  address: Joi.string().trim().strict().required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE)
        .trim()
        .strict(),
      name: Joi.string().required(),
      quantity: Joi.number().required(),
    })
  ),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
});

export const warrantyModel = {
  WARRANTY_COLLECTION_NAME,
  WARRANTY_COLLECTION_SCHEMA,
};

const validataBeforeCreate = async (data) => {
  try {
    return await WARRANTY_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
  } catch (error) {
    throw error;
  }
};

export const createWarrantyCard = async (data) => {
  try {
    const validatedData = await validataBeforeCreate(data);
    const createOrder = {
      ...validatedData,
      orderId: new ObjectId(validatedData.orderId),
      products: validatedData.products.map((product) => ({
        ...product,
        productId: new ObjectId(product.productId),
      })),
    };
    return await getDB()
      .collection(WARRANTY_COLLECTION_NAME)
      .insertOne(createOrder);
  } catch (error) {
    throw error;
  }
};

export const getWarranty = async () => {
  try {
    return await getDB().collection(WARRANTY_COLLECTION_NAME).find().toArray();
  } catch (error) {
    throw error;
  }
};

import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { status } from "~/enum/typeDevice";
import { ObjectId } from "mongodb";
import { getDB } from "~/config/mongodb";
import { productModel } from "./productModel";
const ORDER_COLLECTION_NAME = "orders";
const ORDER_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .trim()
    .strict(),
  staffId: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .trim()
    .strict(),
  name: Joi.string().required().trim().strict(),
  email: Joi.string().required().trim().strict(),
  phone: Joi.string().required().trim().strict(),
  address: Joi.string().required().trim().strict(),
  totalAmount: Joi.number().required(),
  isPaided: Joi.boolean().default(false),
  product: Joi.array().items({
    productId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    quantity: Joi.number().required(),
  }),
  status: Joi.string()
    .valid(...status)
    .trim()
    .strict()
    .default("pending"),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  updateAt: Joi.date().timestamp("javascript").default(null),
});

export const orderModel = {
  ORDER_COLLECTION_NAME,
  ORDER_COLLECTION_SCHEMA,
};

const validataBeforeCreate = async (data) => {
  try {
    return await ORDER_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (data) => {
  try {
    const validatedData = await validataBeforeCreate(data);
    const createOrder = {
      ...validatedData,
      userId: new ObjectId(validatedData.userId),
      product: validatedData.product.map((product) => ({
        ...product,
        productId: new ObjectId(product.productId),
      })),
    };
    return await getDB()
      .collection(ORDER_COLLECTION_NAME)
      .insertOne(createOrder);
  } catch (error) {
    throw error;
  }
};

export const findOrderById = async (id) => {
  try {
    return await getDB()
      .collection(ORDER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw error;
  }
};

export const findOrdersByUserId = async (id) => {
  try {
    return await getDB()
      .collection(ORDER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            userId: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: productModel.PRODUCT_COLLECTION_NAME,
            localField: "product.productId",
            foreignField: "_id",
            as: "products",
          },
        },
        // sau này thêm cả staff
      ])
      .toArray();
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (orderId, updateData) => {
  try {
    const result = await getDB()
      .collection(ORDER_COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(orderId) }, { $set: updateData });
    return result;
  } catch (error) {
    throw error;
  }
};

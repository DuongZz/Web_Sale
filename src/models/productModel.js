import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { generateSlug } from "~/utils/generateSlug";
import { typeDevice } from "~/enum/typeDevice";

const PRODUCT_COLLECTION_NAME = "products";
const PRODUCT_COLLECTION_SCHEMA = Joi.object({
  _id: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  deviceCode: Joi.string().required().trim().strict(),
  name: Joi.string().required().trim().strict(),
  price: Joi.number().required().trim().strict(),
  stock: Joi.number().required().trim().strict(),
  information: Joi.string().required().trim().strict(),
  techSpecification: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      desc: Joi.string(),
      warranty: Joi.string().required(),
    })
  ),
  brand: Joi.string().required().trim().strict(),
  discount: Joi.number().required().trim().strict(),
  typeDevice: Joi.string()
    .valid(...typeDevice)
    .required()
    .trim()
    .strict(),
  rate: Joi.string().required().trim().strict(),
  rateScore: Joi.number().required().trim().strict(),
  imageList: Joi.array().items([Joi.string().required()]),
  year: Joi.number().required().trim().strict(),
  sold: Joi.number().required().trim().strict(),
  warranty: Joi.string().trim().strict(),
  slug: Joi.string().required().custom(generateSlug),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  createAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const productModel = {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTION_SCHEMA,
};

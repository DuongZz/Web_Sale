import Joi from "joi";
import { typeDevice } from "~/enum/typeDevice";
const CATALOG_COLLECTION_NAME = "catalog";
const CATALOG_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().trim().strict(),
  device: Joi.string()
    .valid(...typeDevice)
    .trim()
    .strict(),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  createAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const catalogModel = {
  CATALOG_COLLECTION_NAME,
  CATALOG_COLLECTION_SCHEMA,
};

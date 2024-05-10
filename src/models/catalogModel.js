import Joi from "joi";
const CATALOG_COLLECTION_NAME = "catalog";
const CATALOG_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().trim().strict(),
  device: Joi.array()
    .items(
      Joi.string().valid(
        ...productModel.PRODUCT_COLLECTION_SCHEMA.properties.typeDevice
      )
    )
    .required(),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  createAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

export const catalogModel = {
  CATALOG_COLLECTION_NAME,
  CATALOG_COLLECTION_SCHEMA,
};

import Joi from "joi";
import { typeDevice } from "~/enum/typeDevice";
import { generateSlug } from "~/utils/generateSlug";

const validateProduct = async (req, res, next) => {
  const correctCondition = Joi.object({
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
  });

  try {
    req.body.techSpecification = JSON.parse(req.body.techSpecification);

    req.body.price = parseFloat(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discount = parseFloat(req.body.discount);
    req.body.year = parseInt(req.body.year);
    req.body.sold = parseInt(req.body.sold);

    await correctCondition.validateAsync(req.body);
    next();
  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.status(400).json({ error: "Invalid JSON data" });
  }
};

export const productValidation = {
  validateProduct,
};

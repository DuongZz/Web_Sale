import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { typeDevice } from "~/enum/typeDevice";
import ApiError from "~/utils/ApiError";

const validateProduct = async (req, res, next) => {
  const correctCondition = Joi.object({
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
    rate: Joi.string().trim().strict(),
    rateScore: Joi.number().strict(),
    image: Joi.string(),
    year: Joi.number().required().strict(),
    sold: Joi.number().required().strict(),
    warranty: Joi.string().trim().strict(),
  });

  try {
    req.body.techSpecification = JSON.parse(req.body.techSpecification);

    req.body.price = parseFloat(req.body.price.replace(/\./g, ""));
    req.body.stock = parseInt(req.body.stock);
    req.body.discount = parseFloat(req.body.discount);
    req.body.year = parseInt(req.body.year);
    req.body.sold = parseInt(req.body.sold);

    await correctCondition.validateAsync(req.body);
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const newError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage
    );
    next(newError);
  }
};

export const productValidation = {
  validateProduct,
};

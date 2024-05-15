import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiError";

const validateUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().min(5).max(20).trim().strict(),
    email: Joi.string().email().trim().strict(),
    password: Joi.string().min(5).max(20).trim().strict(),
    address: Joi.string().max(500).trim().strict(),
    phone: Joi.string().min(10).max(15).trim().strict(),
  });
  try {
    await correctCondition.validateAsync(req.body);
    next();
  } catch (error) {
    const errorMessage = new Error(error).message
    const newError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(newError)
  }
};

export const userValidation = {
  validateUser,
};

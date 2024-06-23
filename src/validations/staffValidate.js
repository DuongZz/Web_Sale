import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiError";

const validateStaff = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(8).max(20).trim().strict(),
    name: Joi.string().required().min(5).max(20).trim().strict(),
    staffCode: Joi.string().required().min(5).max(10).trim().strict(),
    password: Joi.string().required().min(5).max(20).trim().strict(),
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

export const staffValidation = {
  validateStaff,
};

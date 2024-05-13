import Joi from "joi";

const validateUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(8).max(20).trim().strict(),
    name: Joi.string().min(5).max(20).trim().strict(),
    email: Joi.string().email().trim().strict(),
    password: Joi.string().min(5).max(20).trim().strict(),
    address: Joi.string().min(5).max(100).trim().strict(),
    phone: Joi.string().min(10).max(15).trim().strict(),
    role: Joi.string().valid("user", "admin", "staff"),
    createAt: Joi.date().timestamp("javascript").default(Date.now),
  });
  try {
    await correctCondition.validateAsync(req.body);
    next();
  } catch (error) {
    throw error;
  }
};

export const userValidation = {
  validateUser,
};

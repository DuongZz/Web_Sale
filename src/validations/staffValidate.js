import Joi from "joi";

const validateStaff = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(8).max(20).trim().strict(),
    name: Joi.string().required().min(5).max(20).trim().strict(),
    staffCode: Joi.string().required().min(5).max(10).trim().strict(),
    password: Joi.string().required().min(5).max(20).trim().strict(),
    createAt: Joi.date().timestamp("javascript").default(Date.now),
  });
  try {
    await correctCondition.validateAsync(req.body);
    next();
  } catch (error) {
    throw error;
  }
};

export const staffValidation = {
  validateStaff,
};

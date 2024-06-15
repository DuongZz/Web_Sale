import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { ObjectId } from "mongodb";
import { findProductById, updateProduct } from "~/models/productModel";
import { findUserById } from "~/models/userModel";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

export const createRateProdService = async (req) => {
  try {
    const id = req.params.id;
    const prod = await findProductById(id);
    if (!prod) throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
    const user = await findUserById(req.user.id);
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    // bản mẫu 1 comment
    const ratePattern = Joi.object({
      userId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
      name: Joi.string().required().trim().strict(),
      rate: Joi.number().required(),
      comment: Joi.string().required().trim().strict(),
      createAt: Joi.date().timestamp("javascript").default(Date.now),
    });
    // comment mới
    const { rate, comment } = req.body;

    const newRate = {
      rate: Number(rate),
      comment: comment,
      userId: req.user.id,
      name: user.name,
    };

    const result = await ratePattern.validateAsync(newRate, {
      abortEarly: false,
    });

    await updateProduct(
      { _id: new ObjectId(id) },
      {
        $push: {
          rateList: result,
        },
        $inc: {
          rateQuan: 1,
          rateSum: Number(rate),
        },
      }
    );

    return result;
  } catch (error) {
    throw error;
  }
};

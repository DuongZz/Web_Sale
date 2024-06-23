import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { findUserById, updateUser } from "~/models/userModel";
import ApiError from "~/utils/ApiError";

export const updateMeController = async (req, res, next) => {
  try {
    const {name , phone} = req.body
    if(!phone.match(/^[0-9]{9,15}$/)) return next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, "Invalid phone"))
    const user = await findUserById(req.user.id)
    if(!user) return next(new ApiError(StatusCodes.NOT_FOUND, "User not found"))
    await updateUser({_id: new ObjectId(req.user.id)}, {
  $set: {
    name: name,
    phone: phone,
  },
  },{})
  const updatedUser = await findUserById(req.user.id)
  res.status(StatusCodes.OK).json(updatedUser)
  } catch (error) {
    next(error);
  }
}
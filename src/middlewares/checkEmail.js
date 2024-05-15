import { getDB } from "~/config/mongodb";
import { userModel } from "~/models/userModel";

export const existingEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const db = getDB();
    const existingEmail = await db
      .collection(userModel.USER_COLLECTION_NAME)
      .findOne({ email: email });
    if (existingEmail) {
      throw new Error("Email is already registered");
    }
    next();
  } catch (error) {
    next(error);
  }
};

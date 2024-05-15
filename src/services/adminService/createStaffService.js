import { getDB } from "~/config/mongodb";
import { staffModel } from "~/models/staffModel";
import bcrypt from "bcrypt";
export const createStaffService = async (req) => {
  try {
    const { username, name, staffCode, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newStaffAcc = {
      username,
      name,
      staffCode,
      password: hashedPassword,
    };
    const db = getDB();
    await db
      .collection(staffModel.STAFF_COLLECTION_NAME)
      .insertOne(newStaffAcc);

    return newStaffAcc;
  } catch (error) {
    throw new Error(error);
  }
};

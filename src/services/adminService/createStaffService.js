import bcrypt from "bcrypt";
import { createStaff, findStaffById } from "~/models/staffModel";
export const createStaffService = async (req) => {
  try {
    const { username, name, staffCode, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const data = {
      username,
      name,
      staffCode,
      password: hashedPassword,
    };
    const createdStaff =  await createStaff(data);
    const newStaff = await findStaffById(createdStaff.insertedId);
    return newStaff;
  } catch (error) {
    throw new Error(error);
  }
};

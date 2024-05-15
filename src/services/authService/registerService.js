import bcrypt from "bcrypt";
import { createUser } from "~/models/userModel";
export const registerService = async (req) => {
  try {
    const { name, email, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const data = {
      name,
      email,
      password: hashedPassword,
    };

    await createUser(data)

  } catch (error) {
    throw new Error(error);
  }
};

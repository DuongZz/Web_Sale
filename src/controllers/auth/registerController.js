import { userModel } from "~/models/userModel";
import { getDB } from "~/config/mongodb";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, name, email, password, address, phone, role } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = {
      username,
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      role,
      accessToken: "",
      refreshToken: "",
    };
    const db = getDB();
    await db.collection(userModel.USER_COLLECTION_NAME).insertOne(newUser);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(401).json({ message: "Registration failed: " + error.message });
  }
};

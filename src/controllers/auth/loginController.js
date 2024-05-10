import { userModel } from "~/models/userModel";
import { getDB } from "~/config/mongodb";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "~/utils/generateToken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = getDB();
    const user = await db
      .collection(userModel.USER_COLLECTION_NAME)
      .findOne({ username });
    if (!user) {
      return res.status(404).json("Username Not Found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json("Wrong Password");
    }
    if (user && validPassword) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await db.collection(userModel.USER_COLLECTION_NAME).updateOne(
        { username },
        {
          $set: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        }
      );
      const updatedUser = await db
        .collection(userModel.USER_COLLECTION_NAME)
        .findOne({ username });
      delete updatedUser.password;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      delete user.password;

      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

import { get } from "lodash";
import { getDB } from "~/config/mongodb";
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json("No refresh token provided");
    }
    const db = getDB();
    res.clearCookie("refreshToken", {
      path: "/",
      sameSite: "strict",
    });

    res.status(200).json("Logout successful");
  } catch (error) {
    res.status(500).json(error);
  }
};

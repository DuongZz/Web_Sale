import jwt from "jsonwebtoken";
import { env } from "~/config/environment";
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      role: user.role,
    },
    env.SECRET_ACCESS_TOKEN,
    {
      expiresIn: "1D",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    env.SECRET_REFRESH_TOKEN,
    {
      expiresIn: "360D",
    }
  );
};

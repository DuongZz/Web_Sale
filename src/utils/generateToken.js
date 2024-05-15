import jwt from "jsonwebtoken";
import { env } from "~/config/environment";
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
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
      id: user.id,
      role: user.role,
    },
    env.SECRET_REFRESH_TOKEN,
    {
      expiresIn: "360D",
    }
  );
};

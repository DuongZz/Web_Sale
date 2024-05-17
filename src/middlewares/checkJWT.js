import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"; 
import { env } from "~/config/environment";
import { updateUser } from "~/models/userModel";
import ApiError from "~/utils/ApiError";
import { generateAccessToken } from "~/utils/generateToken";

export const checkJWT =  (req, res, next) => {
  const accessToken = req.cookies["accessToken"];
  const refreshToken = req.cookies["refreshToken"];
  if (accessToken && refreshToken) {
    jwt.verify(accessToken, env.SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) {
        jwt.verify(refreshToken, env.SECRET_REFRESH_TOKEN, (err,user) => {
          if (err) {
              updateUser({refreshToken: refreshToken},{
                $set: {
                  accessToken: undefined,
                  refreshToken: undefined,
                },
              }, {}).then(()=> res.status(StatusCodes.UNAUTHORIZED).json({ message: "Refresh and access token are expried"})).catch(()=> next(err));
          }
          else {

            const newAccesTonken = generateAccessToken(user);

            res.cookie("accessToken", newAccesTonken, {
              path: "/",
              sameSite: "None",
              secure: env.COOKIE_IS_USE_SECURE,
              httpOnly: true,
              partitioned: true,
            });

            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Refresh access token successfully"})
          }
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Token is missing"));
  }
};

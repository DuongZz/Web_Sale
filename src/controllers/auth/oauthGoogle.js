import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";
import { createUser, findUserByEmail, updateUser } from "~/models/userModel";
import { getGoogleOauthToken, getGoogleUser } from "~/services/authService/userService";
import ApiError from "~/utils/ApiError";
import { generateAccessToken, generateRefreshToken } from "~/utils/generateToken";

export const oauthGoogle = async (req, res, next) => {
  try {
    const code = req.query.code;

    const {id_token, access_token} = await getGoogleOauthToken(code)

    const googleUser = await getGoogleUser(id_token, access_token)

    if (!googleUser.verified_email) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Google account is not verified"))
    }

    let user =  await findUserByEmail(googleUser.email)
    if(!user) {
      user = await createUser({email: googleUser.email, name: "Google User", password: "defautpassword", role: "user"})
    }
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

      await updateUser({_id: user.insertedId},{
        $set: {
          refreshToken: refreshToken,
        },
      }, {})

      res.cookie("refreshToken", refreshToken, {
        path: "/",
        sameSite: "None",
        secure: env.COOKIE_IS_USE_SECURE,
        httpOnly: true,
        partitioned: true,
      });

      res.cookie("accessToken", accessToken, {
        path: "/",
        sameSite: "None",
        secure: env.COOKIE_IS_USE_SECURE,
        httpOnly: true,
        partitioned: true,
      });

      res.redirect(`${env.REACT_GEARVN_CLONE_HOST}`)
      

  } catch (error) {
    next(error)
  }
}
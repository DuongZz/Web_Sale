import { StatusCodes } from "http-status-codes";
import { updateUser } from "~/models/userModel";
export const logout = async (req, res, next) => {
  try {
    if (req.user)
      await updateUser({_id: req.user.id},{
        $set: {
          accessToken: undefined,
          refreshToken: undefined,
        },
      }, {})
      res.clearCookie("refreshToken", {
      path: "/",
      sameSite: "strict",
    });

    console.log(req.user)
    

    res.status(StatusCodes.OK).json({message: "Logout successful"});
  } catch (error) {
    next(error);
  }
};

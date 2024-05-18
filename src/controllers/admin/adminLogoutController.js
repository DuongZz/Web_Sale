import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { updateStaff } from "~/models/staffModel";
export const logout = async (req, res, next) => {
  try {
    if (req.user)
      await updateStaff({_id: new ObjectId(req.user.id)},{
        $set: {
          refreshToken: undefined,
        },
      }, {})
      res.clearCookie("refreshToken", {
        path: "/",
        sameSite: "None",
        secure: true,
        httpOnly: true,
        partitioned: true,
    });
      res.clearCookie("accessToken", {
        path: "/",
        sameSite: "None",
        secure: true,
        httpOnly: true,
        partitioned: true,
    });  

    res.status(StatusCodes.OK).json({message: "Logout successful"});
  } catch (error) {
    next(error);
  }
};

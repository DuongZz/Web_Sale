import { StatusCodes } from "http-status-codes";
import { registerService } from "~/services/authService/registerService";

export const register = async (req, res, next) => {
  try {
    await registerService(req)

    res.status(StatusCodes.CREATED).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

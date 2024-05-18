import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { findStaffById, updateStaff } from "~/models/staffModel";
import ApiError from "~/utils/ApiError";

export const updateStaffService = async (req) => {
  try {
    const id = req.params.id;
    const {staffCode, password, role} = req?.body;
    const  staff= await findStaffById(id);
    if(!staff) throw new ApiError(StatusCodes.NOT_FOUND, "Staff not found");

    let doc0 = {}

    if(staffCode) doc0.staffCode = staffCode;
    if(password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      doc0.password =  hashedPassword;
    }
    if(role &&["staff", "admin"].includes(role)) doc0.role = role;

    await updateStaff({_id: staff._id}, {$set: doc0})
    return await findStaffById(staff._id)

  } catch (error) {
    throw error
  }
}
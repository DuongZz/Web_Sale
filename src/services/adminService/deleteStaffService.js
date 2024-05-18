import { findStaffById, updateStaff } from "~/models/staffModel";

export const deleteServiceService = async (req) => {
  try {
    const id = req.params.id;
    const staff = await findStaffById(id);
    if(!staff) throw new ApiError(StatusCodes.NOT_FOUND, "Staff not found");
    await updateStaff({_id: staff._id}, {$set: {_destroy: true}})
  } catch (error) {
    throw error;
  }
}
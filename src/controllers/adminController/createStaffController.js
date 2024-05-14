import { createStaffService } from "~/services/adminService/createStaffService";

export const createStaffController = async (req, res) => {
  try {
    const newStaff = await createStaffService(req);
    res.status(201).json({
      message: "Staff account created successfully",
      staff: newStaff,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

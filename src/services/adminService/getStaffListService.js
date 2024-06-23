import { getStaff } from "~/models/staffModel"

export const getStaffListService = async (req) => {
  try {
    const _destroy = Boolean(req?.query?._destroy) || false
    const role = req?.query?.role || null
    let doc0 ={_destroy: _destroy}
    if(role) doc0.role = role

    const  staffList= await getStaff(doc0)
 
    return staffList 
  } catch (error) {
    throw error
  }
}
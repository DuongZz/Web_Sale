import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "~/config/mongodb";
import { role } from "~/enum/typeDevice";
import { checkUnique } from "~/utils/checkUnique";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
// định nghĩa schema and validate
const STAFF_COLLECTION_NAME = "staffs";
const STAFF_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string()
    .required()
    .min(8)
    .max(20)
    .trim()
    .strict()
    .external(async (username) => {
      const isUse = await checkUnique(
        STAFF_COLLECTION_NAME,
        "username",
        username
      );
      if (isUse) {
        throw new Error("Username is already in use!");
      }
      return username;
    }),
  name: Joi.string().required().min(5).max(20).trim().strict(),
  staffCode: Joi.string()
    .required()
    .min(5)
    .max(10)
    .trim()
    .strict()
    .external(async (staffCode) => {
      const isUse = await checkUnique(
        STAFF_COLLECTION_NAME,
        "staffCode",
        staffCode
      );
      if (isUse) {
        throw new Error("StaffCode is already in use!");
      }
      return staffCode;
    }),
  role: Joi.string()
    .valid(...role)
    .default("staff"),
  password: Joi.string().required().trim().strict(),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
  _destroy: Joi.boolean().default(false),
});

export const staffModel = {
  STAFF_COLLECTION_NAME,
  STAFF_COLLECTION_SCHEMA,
};
//các hàm cơ bản tháo tác ở tầng model

// hàm validate data trước khi tháo tác lưu db
const validataBeforeCreate = async (data) => {
  try {
    return await STAFF_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
  } catch (error) {
    throw error;
  }
};

//hàm tạo mới staff
export const createStaff = async (data) => {
  try {
    const validatedData = await validataBeforeCreate(data);
    return await getDB()
      .collection(STAFF_COLLECTION_NAME)
      .insertOne(validatedData);
  } catch (error) {
    throw error;
  }
};

export const findStaffById = async (id) => {
  try {
    return await getDB()
      .collection(STAFF_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
  } catch (error) {
    throw error;
  }
};
export const findStaffByUserName = async (username) => {
  try {
    return await getDB()
      .collection(STAFF_COLLECTION_NAME)
      .findOne({ username: username });
  } catch (error) {
    throw error;
  }
};

export const updateStaff = async (filter, doc, options) => {
  try {
    return await getDB()
      .collection(STAFF_COLLECTION_NAME)
      .updateOne(filter, doc, options);
  } catch (error) {
    throw error;
  }
};

export const getStaff = async (query) => {
  try {
    return await getDB()
      .collection(STAFF_COLLECTION_NAME)
      .find(query)
      .toArray();
  } catch (error) {
    throw error;
  }
};

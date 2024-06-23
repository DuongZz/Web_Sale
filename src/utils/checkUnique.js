const { getDB } = require("~/config/mongodb");

export const checkUnique = async (COLLECTION_NAME, key, value) => {
  try {
    const options = {}
    options[key] = value;
    const staff = await getDB()
     .collection(COLLECTION_NAME)
     .findOne(options);
    
    if (staff) {
      return true;
    } return false;

  } catch (error) {
    throw new Error(message)
  }
}

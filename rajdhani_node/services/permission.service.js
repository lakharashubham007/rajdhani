const { Permission } = require("../models");

const getPermission = async (roomCategoryData) => {
  try {
    const permission = Permission.find()
    return permission
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};


module.exports = {
    getPermission,
};

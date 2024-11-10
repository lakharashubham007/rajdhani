const { Vendors } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

const createVendor = async (userBody) => {
  if (await Vendors.isEmailTaken(userBody.email)) {
    return {
      success: false,
      message: 'Email is already taken',
    };
  } else {
    const hashedPassword = await bcrypt.hash(userBody.password, 10);
    const newUser = await Vendors.create({
      ...userBody,
      password: hashedPassword,
    });
    return newUser;
  }
}

const getVendorByEmail = async (email) => {
  return await Vendors.findOne({ email: email });
}

const getVendorByToken = async (remembertoken) => {
  return await Vendors.findOne({ remembertoken: remembertoken });
}


const getVendors = async () => {
  try {
    const vendors = await Vendors.find();
    return vendors;
  } catch (error) {
    console.error("Error getting admin :", error);
    throw error;
  }
};


module.exports = { createVendor, getVendorByEmail, getVendorByToken, getVendors };
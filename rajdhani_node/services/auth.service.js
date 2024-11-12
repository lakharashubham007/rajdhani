const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !await user.isPasswordMatch(password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const loginClientWithEmailAndPassword = async (email, password) => {
  const user = await userService.getClientByEmail(email);
  if (!user || !await user.isPasswordMatch(password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const loginVendorWithEmailAndPassword = async (email, password) => {
  const vendor = await userService.getVendorByEmail(email);
  if (!vendor || !await vendor.isPasswordMatch(password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return vendor;
};

const logoutUser = async (token) => {
  const user = await userService.getUserByToken(token);
  if (user) {
    user.remembertoken = '';
    await user.save();
  }
};

const logoutVendor = async (token) => {
  const vendor = await userService.getVendorByToken(token);
  if (vendor) {
    vendor.remembertoken = '';
    await vendor.save();
  }
};

module.exports = {
  loginClientWithEmailAndPassword,
  loginVendorWithEmailAndPassword,
  loginUserWithEmailAndPassword,
  logoutUser,
  logoutVendor
};
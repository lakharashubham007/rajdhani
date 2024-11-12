const { Admins, Vendors, Clients } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

const createUser = async (userBody) => {
    if (await Admins.isEmailTaken(userBody.email)) {
       throw new ApiError(httpStatus.OK, "Email already taken");
     } else {
       const hashedPassword = await bcrypt.hash(userBody.password, 10);
       const newUser = await Admins.create({
         ...userBody,
         password: hashedPassword,
       });
       console.log("newUser",newUser);
     return newUser;
 }
 }

 const createClient = async (userBody) => {
  if (await Clients.isEmailTaken(userBody.email)) {
     throw new ApiError(httpStatus.OK, "Email already taken");
   } else {
     const hashedPassword = await bcrypt.hash(userBody.password, 10);
     const newUser = await Clients.create({
       ...userBody,
       password: hashedPassword,
     });
     console.log("newUser",newUser);
   return newUser;
}
}

 const getUserByEmail = async (email) => {
  return await Admins.findOne({email: email});
}

const getVendorByEmail = async (email) => {
  return await Vendors.findOne({email: email});
}

const getClientByEmail = async (email) => {
  return await Clients.findOne({email: email});
}
 
const getUserByToken = async (remembertoken) => {
   return await Admins.findOne({remembertoken: remembertoken});
}
 
const getVendorByToken = async (remembertoken) => {
  return await Admins.findOne({remembertoken: remembertoken});
}

const getClientByToken = async (remembertoken) => {
  return await Clients.findOne({remembertoken: remembertoken});
}

const getAdmins = async () => {
  try {
    const admin = await Admins.find();
    return admin;
  } catch (error) {
    console.error("Error getting admin :", error);
    throw error;
  }
};


 module.exports ={  createUser, getUserByEmail, getUserByToken,getAdmins ,getVendorByEmail,getVendorByToken ,createClient, getClientByEmail, getClientByToken};
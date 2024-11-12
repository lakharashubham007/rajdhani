const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");
// const { Admins } = require("../models/user.model");
const { Admins } = require("../models/admins.model");
const { Vendors, Clients } = require("../models");



const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const Payload = {
    sub: userId,
    iat: Math.floor(Date.now / 1000),
    type: type,
    exp: expires
  }
  return jwt.sign(Payload, secret)
};


const generateAuthTokens = async (user) => {
  
  const accessTokenExpires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  await Admins.updateOne(
    { _id: user._id },
    { $set: { remembertoken: accessToken } }
  );


  // Retrieve the updated user document
  const updatedUser = await Admins.findById(user._id);


  return {
    token: accessToken,
    expires: new Date(accessTokenExpires * 1000),
    user: updatedUser
};
}


const generateVendorAuthTokens = async (user) => {
  
  const accessTokenExpires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  await Vendors.updateOne(
    { _id: user._id },
    { $set: { remembertoken: accessToken } }
  );


  // Retrieve the updated user document
  const updatedUser = await Vendors.findById(user._id);


  return {
    token: accessToken,
    expires: new Date(accessTokenExpires * 1000),
    vendor: updatedUser
};
}


const generateClientAuthTokens = async (user) => {
  
  const accessTokenExpires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  await Clients.updateOne(
    { _id: user._id },
    { $set: { remembertoken: accessToken } }
  );


  // Retrieve the updated user document
  const updatedUser = await Clients.findById(user._id);


  return {
    token: accessToken,
    expires: new Date(accessTokenExpires * 1000),
    client: updatedUser
};
}

/**
 
  const accessTokenExpires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;
  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    }
  }



 */

module.exports = {
  generateToken,
  generateAuthTokens,
  generateVendorAuthTokens,
  generateClientAuthTokens
};
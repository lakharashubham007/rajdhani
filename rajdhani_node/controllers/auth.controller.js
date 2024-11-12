const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");


const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});


const registerClient = catchAsync(async (req, res) => {
  const client = await userService.createClient(req.body);
  const tokens = await tokenService.generateClientAuthTokens(client);
  res.status(httpStatus.CREATED).send({ client, tokens });
});


const getAdmins = async (req, res) => {
  try {
    const admins = await userService.getAdmins();
    res.json({ success: true, admins: admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ message: 'Login successfully', user, tokens });
});

//loginClient
const loginClient = catchAsync(async (req, res) => {
  
  const { email, password } = req.body;
  console.log('email and pass',email,password)
  const client = await authService.loginClientWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateClientAuthTokens(client);
  res.status(httpStatus.OK).send({ message: 'Login successfully', client, tokens });
});

const loginRestaurant = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const vendor = await authService.loginVendorWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateVendorAuthTokens(vendor);
  res.status(httpStatus.OK).send({  message: 'Login successfully', vendor, tokens });
});

const loginEmployee = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ message: 'Login successfully', user, tokens });
});





const logout = catchAsync(async (req, res) => {
  const { token } = req.body;
  await authService.logoutUser(token);
  res.status(httpStatus.OK).send({ message: 'Logout successful' });
})


module.exports = {
  getAdmins,
  register,
  login,
  logout,
  loginRestaurant,
  loginEmployee,
  registerClient,
  loginClient
};
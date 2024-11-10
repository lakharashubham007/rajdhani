const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, vendorService, tokenService } = require("../services");


const createVendor = catchAsync(async (req, res) => {
    const vendor = await vendorService.createVendor(req.body);
    const tokens = await tokenService.generateVendorAuthTokens(vendor);
    res.status(httpStatus.CREATED).send({ vendor, tokens });
});


module.exports = {
    createVendor,
};
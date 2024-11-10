const express = require("express");
const cuisines = require("./cuisines.route");
const roles = require("./role.route")
const vendor = require("./vendors.route")
const brand = require('./brands.route')
const category = require('./categories.route')
const part = require('./parts.route')
const product = require('./product.route');
const variant = require('./variants.route')

const router = express.Router();

router.use("/cuisines", cuisines);
router.use("/role",roles)
router.use("/vendor",vendor)
router.use("/brand",brand)
router.use("/category",category)
router.use("/part",part)
router.use("/product",product)
router.use("/variant",variant)



module.exports = router;
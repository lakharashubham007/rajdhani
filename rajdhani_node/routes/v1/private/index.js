const express = require("express");
const roles = require("./role.route")
const vendor = require("./vendors.route")
const brand = require('./brands.route')
const category = require('./categories.route')
const part = require('./parts.route')
const product = require('./product.route');
const variant = require('./variants.route')
const thread = require('./threads.route')
const fittingsize = require('./fittingSize.route')
const material = require('./material.route')
const supplier = require('./supplier.route')
const purchaseorders = require('./purchaseOrder.route')
const pobills = require('./purchaseOrderBill.route')
const bulk = require('./bulkimport.route')
const design = require('./design.route')
const fittingthreads = require('./fittingThreads.route')
const hosedashsize = require('./hoseDashSize.route')
const fittingdashsize = require('./fittingDashSize.route')
const router = express.Router();

//rajdhani route
router.use("/category",category)
router.use("/brand",brand)
router.use("/parts",part)
router.use("/products",product)
router.use("/variants",variant)
router.use("/role",roles)
router.use("/threads",thread)
router.use("/fittingsizes",fittingsize)
router.use("/materials",material)
router.use("/suppliers",supplier)
router.use("/purchaseorders",purchaseorders)
router.use("/pobills",pobills)
router.use("/design",design)
router.use("/fittingthreads",fittingthreads)
router.use("/bulk",bulk)
router.use("/hosedashsize", hosedashsize)
router.use("/fittingdashsize",fittingdashsize)


//restaurant
router.use("/vendor",vendor)


module.exports = router;
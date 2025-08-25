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
const bendAngle = require('./bendangle.route')
const hosetype = require('./hosetype.route')
const brandlayline = require('./brandlayline.route')
const batch = require("./batch.route")
const stockMaintenance = require("./stockMaintenance.route")
const inventory = require('./inventory.route')
const countries = require('./country.route')
const customer = require('./customer.route')
const saleorders = require('./saleorders.route')
const productCodeSeries = require('./productCodeSeries.route')
const productionSheet = require('./productionSheet.route')
const productionProcess = require('./productionProcess.route')
const operator = require('./operator.route')
const inventoryItemLog = require('./inventoryItemsLog.route')
const inventoryRejectionDetails = require('./inventoryRejectionDetails.route')
const inventoryRejectionItems = require('./inventoryRejectionItems.route')
const packingDetails = require('./packingDetails.route')
const packingItems = require('./packingItems.route')
const gatePassDetails = require('./gatePassDetails.route')
const gatePassItems = require('./gatePassItems.route')
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
router.use("/bendangle", bendAngle)
router.use("/hosetype",hosetype)
router.use("/brandlayline",brandlayline)
//restaurant
router.use("/vendor",vendor)

//Batch Allocation
router.use("/batch", batch)
router.use("/stock", stockMaintenance)
router.use("/inventory", inventory)
router.use("/locations", countries)
router.use("/customer", customer)
router.use("/so", saleorders)
router.use("/series", productCodeSeries)

//production Sheet
router.use("/production-sheet", productionSheet)
router.use("/production-process", productionProcess)
router.use("/operator", operator)
router.use("/inventory-item-log", inventoryItemLog)
router.use("/inventoryrejectiondetails", inventoryRejectionDetails)
router.use("/inventoryrejectionitems", inventoryRejectionItems)


router.use("/inventory-item-log", inventoryItemLog)

//packing
router.use("/packing-details", packingDetails)
router.use("/packing-items", packingItems)

router.use("/gatePass-details", gatePassDetails)
router.use("/gatePass-items", gatePassItems)


//inventory rejection





module.exports = router;
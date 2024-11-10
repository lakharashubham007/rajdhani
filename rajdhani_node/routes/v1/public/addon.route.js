const express = require("express");
const router = express.Router();
const { addonController } = require("../../../controllers");


router.post("/create-addon", addonController.createAddon );
router.get("/addons-list", addonController.getAddons);


module.exports = router; 
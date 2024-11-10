const express = require("express");
const router = express.Router();
const { zones } = require("../../../controllers");


router.post("/add/zone", zones.createZone );
router.get("/zone/list", zones.getZones);


module.exports = router; 
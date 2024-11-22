const express = require("express");
const authRoute = require("./auth.route");
const sideBarMenu = require("./sidebarMenu.route")
const cuisines = require("./cuisines.route");
const zone = require('./zones.route');
const permission = require('./permission.route')
// const roles = require('./role.route')
const restaurants = require('./restaurants.route')
// const category = require('./categories.route')
const addons = require('./addon.route')
const food = require('./food.route')
const imageRoute = require('./images.route')
const states = require('./state.route')

const router = express.Router();

router.use("/auth", authRoute);
router.use("/menus", sideBarMenu);
router.use("/cuisines", cuisines);
router.use("/zones", zone);
router.use("/permission",permission)
// router.use("/role",roles)
router.use("/restaurant",restaurants);
// router.use("/category",category)
router.use("/addons", addons)
router.use("/food",food)
router.use("/images", imageRoute);
router.use("/states", states);




module.exports = router;
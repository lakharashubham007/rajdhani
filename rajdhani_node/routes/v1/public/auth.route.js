const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/auth.controller");


const multer = require("multer");

// Save Image
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "images");
        },
        filename: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
            // cb(null, file.originalname + "-" + Date.now() + ".jpg")
        },
    }),
}).fields([
    { name: 'image', maxCount: 1 }
]);

router.post("/register", upload, authController.register );
router.post("/register-client", upload, authController.registerClient );
router.get("/admins", authController.getAdmins)
router.post("/login", authController.login);
router.post("/login-client", authController.loginClient);
router.post("/logout", authController.logout);
router.post("/login-restaurant", authController.loginRestaurant);
router.post("/login-employee", authController.loginEmployee);


module.exports = router; 
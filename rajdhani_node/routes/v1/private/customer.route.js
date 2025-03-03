const express = require("express");
const router = express.Router();
const { customerController } = require("../../../controllers");

const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

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

router.post("/create-customer",upload,  Authentication, customerController.createCustomer );
router.get("/customer-list", Authentication,  customerController.getCustomers);
router.get("/customers-all", Authentication,  customerController.getAllCustomers);
router.patch("/edit-customer/:id",upload, Authorization,  customerController.updateCustomer);
router.get("/customer-list/:id", Authentication,  customerController.getCustomerById);
router.delete("/delete-customer/:id", Authentication,  customerController.deleteCustomer);
router.patch("/update-customer-status/:id", Authentication, customerController.updateCustomer);

module.exports = router; 
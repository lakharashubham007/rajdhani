const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        supplier_name: { type: String, trim: true },
        fname: { type: String, trim: true },
        lname: { type: String, trim: true },
        email: { type: String, trim: true },
        mobile_no1: { type: String, trim: true },
        mobile_no2: { type: String, trim: true },
        country: { type: String, trim: true },
        state: { type: String, trim: true },
        city: { type: String, trim: true },
        pin_code: { type: String, trim: true },
        gstNumber: { type: String, trim: true },
        panNumber: { type: String, trim: true },
        address: { type: String, trim: true },
        description: { type: String, trim: true },
        image: { type: String, trim: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports.Supplier = Supplier;


const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        lname: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            maxlength: 100,
        },
        mobile_no1: {
            type: String,
            trim: true,
            maxlength: 15,
        },
        mobile_no2: {
            type: String,
            trim: true,
            maxlength: 15,
        },
        address: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        city: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        state_name: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        country: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        pin_code: {
            type: String,
            trim: true,
            maxlength: 10,
        },
        image: {
            type: String,
            trim: true,
            default: 'rajdhani_product.jpg', // Default image if none provided
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports.Customer = Customer;

const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        firstName: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        phone: {
            type: String,
            trim: true,
            maxlength: 15,
            validate: {
                validator: function (v) {
                    return /^(\+)?[0-9]{10,15}$/.test(v); // Validates international phone numbers
                },
            },
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: 100,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
                },
            },
        },
        address: {
            type: String,
            trim: true,
            // maxlength: 200,
        },
        state: {
            type: String,
            trim: true,
            // maxlength: 100,
        },
        city: {
            type: String,
            trim: true,
            // maxlength: 100,
        },
        pincode: {
            type: String,
            trim: true,
            // maxlength: 6,
            validate: {
                validator: function (v) {
                    return /^[0-9]{6}$/.test(v); // Validates 6-digit pincode
                },
            },
        },
        gstNumber: {
            type: String,
            trim: true,
            unique: true,
            // maxlength: 15,
            // validate: {
            //     validator: function (v) {
            //         return /^[0-9]{15}$/.test(v); // Validates 15-digit GST number
            //     },
            // },
        },
        panNumber: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
            // maxlength: 10,
            // validate: {
            //     validator: function (v) {
            //         return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v); // Validates PAN format
            //     },
            // },
        },
        image: {
            type: String, // URL or file path for the supplier image
            trim: true,
            // maxlength: 200,
        },
        status: {
            type: Boolean,
            default: true,
        },
        description: {
            type: String,
            trim: true,
            // maxlength: 500,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports.Supplier = Supplier;

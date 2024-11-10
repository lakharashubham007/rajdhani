const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const vendorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null, // Nullable in SQL
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null, // Nullable in SQL
        },
        phone: {
            type: String,
            trim: true,
            maxlength: 20,
            default: null, // Nullable in SQL
        },
        email: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
            // index: true, // SQL Index
        },
        password: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        remembertoken: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null, // Nullable in SQL
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Maps SQL timestamps
    }
);

// Check if email is already taken
vendorSchema.statics.isEmailTaken = async function (email) {
    const vendor = await this.findOne({ email });
    return !!vendor;
};

// Compare passwords
vendorSchema.methods.isPasswordMatch = async function (password) {
    const vendor = this;
    return await bcrypt.compare(password, vendor.password);
};

const Vendors = mongoose.model("Vendors", vendorSchema);

module.exports.Vendors = Vendors;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const adminSchema = new mongoose.Schema(
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
            index: true, // SQL Index
        },
        image: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null, // Nullable in SQL
        },
        password: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        remember_token: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null, // Nullable in SQL
        },
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'adminRoles', // Assuming `role_id` references a `Role` schema
            // required: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "adminRoles", // Reference to the Role collection
            required: true,
          },
        zone_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Zone', // Assuming `zone_id` references a `Zone` schema
            default: null, // Nullable in SQL
        },
        zone: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Zone', // Assuming `zone_id` references a `Zone` schema
            default: null, // Nullable in SQL
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Maps SQL timestamps
    }
);


adminSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
  };
  
  adminSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
  };

  
const Admins = mongoose.model("Admins", adminSchema);

module.exports.Admins = Admins;

const mongoose = require("mongoose");

const fittingSizeSchema = new mongoose.Schema(
    {
        size: { 
            type: String, 
            required: true, 
            trim: true, 
            maxlength: 50
        },
        measurementUnit: {
            type: String,
            enum: ["inch", "mm"],
        },
        isActive: { 
            type: Boolean, 
            default: true
        },
        created_at: {
            type: Date,
            default: Date.now, // Automatically set to current date/time
        },
        updated_at: {
            type: Date,
            default: Date.now, // Automatically set to current date/time
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Adds createdAt and updatedAt fields
    }
);

const FittingSize = mongoose.model("FittingSize", fittingSizeSchema);

module.exports.FittingSize = FittingSize;

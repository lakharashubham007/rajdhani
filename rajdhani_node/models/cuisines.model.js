const mongoose = require("mongoose");

const cuisinesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        image: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null, // Nullable in SQL
        },
        status: {
            type: Boolean,
            default: true, 
        },
        created_at: {
            type: Date,
            default: Date.now, 
        },
        updated_at: {
            type: Date,
            default: Date.now,
         },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const cuisines = mongoose.model("cuisines", cuisinesSchema);

module.exports.cuisines = cuisines;
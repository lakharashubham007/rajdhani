const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
    {
        threadSize: { 
            type: String, 
            required: true, 
            trim: true, 
            unique: true,
            maxlength: 50
        },
        thread_type: {
            type: String,
            // enum: ["ORS", "Metric", "BSP", "JIC"], // Thread types
            required: true,
        },
        measurementUnit: {
            type: String,
            enum: ["inch", "mm"],
            required: true
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

const Thread = mongoose.model("Thread", threadSchema);

module.exports.Thread = Thread;

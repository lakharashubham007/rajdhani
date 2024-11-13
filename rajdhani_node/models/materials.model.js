const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: 100
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Materials = mongoose.model("Material", materialSchema);

module.exports.Materials = Materials;

const mongoose = require("mongoose");

const zonesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 191,
        },
        cordinates: [
            {
                lat: {
                    type: Number,
                    required: true,
                },
                lng: {
                    type: Number,
                    required: true,
                }
            }
        ],
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

const zones = mongoose.model("zones", zonesSchema);

module.exports.zones = zones;

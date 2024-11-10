const mongoose = require("mongoose");

const addonsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 191, // Matches SQL varchar(191)
      default: null, // Nullable in SQL
    },
    restaurantName: {
        type: String,
        trim: true,
        maxlength: 191, // Matches SQL varchar(191)
        default: null, // Nullable in SQL
      },
    price: {
      type: String,
      required: true,
      default: 0.00, // Matches SQL default 0.00
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId, // Refers to ObjectId, as it maps to bigint(20)
      required: true,
      ref: 'Restaurant', // Assuming you have a Restaurant model
    },
    status: {
      type: Boolean,
      default: true, // Matches SQL tinyint(1) default 1
    },
    created_at: {
      type: Date,
      default: Date.now, // Matches SQL timestamp
    },
    updated_at: {
      type: Date,
      default: Date.now, // Matches SQL timestamp
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Adds createdAt and updatedAt fields
  }
);

// Create the model
const Addons = mongoose.model("Addons", addonsSchema);

module.exports.Addons = Addons;

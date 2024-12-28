const mongoose = require("mongoose");

const fittingDashSizeSchema = new mongoose.Schema(
  {
    thread_type: {
      type: String,
      trim: true,
      maxlength: 50, // Limit the string length
    },
    dash: {
      type: String,
      trim: true,
      maxlength: 10,
    },
    inch: {
      type: String,
      trim: true,
      maxlength: 10, // Some entries might not have an inch value
      default: null, // Set to null if not provided
    },
    thread: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    pipe_od: {
      type: String,
      trim: true,
      maxlength: 10,
      default: null, // Not all records have this field
    },
    variant: {
        type: String,
        trim: true,
        enum: ["standard", "lower join", "upper join", null], // Restricts to specific values or null
        default: null, // Default to null if not provided
      },
    created_at: {
      type: Date,
      default: Date.now, // Timestamp for when the record is created
    },
    updated_at: {
      type: Date,
      default: Date.now, // Timestamp for when the record is updated
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Automatically manage timestamps
  }
);

// Create the model
const FittingDashSize = mongoose.model("FittingDashSize", fittingDashSizeSchema);

module.exports.FittingDashSize = FittingDashSize;

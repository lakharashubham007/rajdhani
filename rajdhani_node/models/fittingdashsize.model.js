const mongoose = require("mongoose");

const fittingDashSizeSchema = new mongoose.Schema(
  {
    thread_type: {
      type: String,
      trim: true,
    },
    dash_code: {
      type: String,
      trim: true
    },
    inch: {
      type: String,
      trim: true,
    },
    variant: {
      type: String,
      trim: true,
    },
    thread: {
      type: String,
      trim: true,
    },
    dsc_code: {
      type: String,
      trim: true,
    },
    metric_type: {
      type: String,
      trim: true,
    },
    pipe_od: {
      type: String,
      trim: true,
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
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const FittingDashSize = mongoose.model("FittingDashSize", fittingDashSizeSchema);

module.exports.FittingDashSize = FittingDashSize;
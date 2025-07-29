const mongoose = require('mongoose');

const ProductionProcessItemLogSchema = new mongoose.Schema({
  log_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionProcessLog",
    required: true
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionProcessItem",
    required: true
  },
  stage: {
    type: String,
    enum: ['Hose-cutting', 'Skiving', 'Pre-assembly', 'Crimping', 'Testing', 'Packing'],
    required: true
  },
  total_quantity: {
    type: Number,
    required: true
  },
  quantity_accepted: {
    type: Number,
    required: true
  },
  quantity_rejected: {
    type: Number,
    default: 0
  },
  remarks: {
    type: String,
    default: ''
  },
  operator_name: {
    type: String,
    default: 'system'
  },
  operator_id: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    default: null
  },
  operatorNames: {
    type: [String],
    default: []
  },
  operatorIds: {
    type: [mongoose.Schema.Types.ObjectId],
    // ref: 'User',
    default: []
  },
  superviosr: {
    type: String,
    default: 'system'
  },
  log_message: {
    type: String,
    default: '-'
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

const ProductionProcessItemLog = mongoose.model("ProductionProcessItemLog", ProductionProcessItemLogSchema);

module.exports.ProductionProcessItemLog = ProductionProcessItemLog;



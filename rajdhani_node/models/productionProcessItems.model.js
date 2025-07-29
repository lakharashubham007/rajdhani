const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  quantityAccepted: {
    type: Number,
    default: 0
  },
  quantityRejected: {
    type: Number,
    default: 0
  },
  lastUpdatedQuantity: {
    type: Number,
    default: 0
  },
  operatorName: {
    type: String,
    default: ''
  },
  operator_id: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    default: null
  },
  line_number: {
    type: String,
    default: ''
  },
  remarks: {
    type: String,
    default: ''
  },

  line_number: String,
  remarks: String,
  updatedBy: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const SkivingStageSchema = new mongoose.Schema({
  ...StageSchema.obj,
  isSkiving: {
    type: Boolean,
    default: true
  }
}, { _id: false });

// Pre-assembly schema with array operator support
const PreAssemblyStageSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  quantityAccepted: {
    type: Number,
    default: 0
  },
  quantityRejected: {
    type: Number,
    default: 0
  },
  lastUpdatedQuantity: {
    type: Number,
    default: 0
  },
  operatorName: {
    type: [String],
    default: []
  },
  operator_id: {
    type: [mongoose.Schema.Types.ObjectId],
    // ref: 'User',
    default: []
  },
  line_number: {
    type: String,
    default: ''
  },
  remarks: {
    type: String,
    default: ''
  },
  updatedBy: {
    type: String,
    default: 'System'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const defaultStage = {
  quantityAccepted: 0,
  quantityRejected: 0,
  remarks: null,
  status: 'Pending'
};

const ProductionProcessItemSchema = new mongoose.Schema({
  production_process_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductionProcess',
    required: true
  },
  sheet_no: String,
  part_no: String,
  sheet_total_quantity: String,

  hoseCuttingStage: {
    type: StageSchema,
    default: () => ({ ...defaultStage })
  },
  skivingStage: {
    type: SkivingStageSchema,
    default: () => ({
      ...defaultStage,
      isSkiving: true
    })
  },
  preAssemblyStage: {
    type: PreAssemblyStageSchema,
    default: () => ({ ...defaultStage })
  },
  crimpingStage: {
    type: StageSchema,
    default: () => ({ ...defaultStage })
  },
  testingStage: {
    type: StageSchema,
    default: () => ({ ...defaultStage })
  },
  packingStage: {
    type: StageSchema,
    default: () => ({ ...defaultStage })
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

const ProductionProcessItem = mongoose.model("ProductionProcessItem", ProductionProcessItemSchema);

module.exports.ProductionProcessItem = ProductionProcessItem;


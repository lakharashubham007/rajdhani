// models/ProductionProcess.js
const mongoose = require('mongoose');

const StageTimeSchema = new mongoose.Schema({
  start_time: {
    type: Date,
    default: null
  },
  end_time: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  started: {
    type: Boolean,
    default: false
  }
}, { _id: false });


const defaultStage = {
  start_time: null,
  end_time: null,
  status: 'Not Started',
  started: false
};


const ProductionProcessSchema = new mongoose.Schema({
  process_uid: {
    type: String,
    required: true,
    unique: true // e.g., PP-20250619-001
  },
  production_sheet_id: {
    type: String,
    required: true,
  },
  sheet_no: {
    type: String,
    required: true,
  },
  production_process_start_date_time: {
    type: Date,
    default: null
  },
  production_process_end_date_time: {
    type: Date,
    default: null
  },
   production_process_pause_start_date_time: {
    type: Date,
    default: null
  },
  production_process_pause_end_date_time: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
    default: 'Not Started'
  },
  production_process_is_running: {
    type: Boolean,
    default: false
  },
  isPaused: {
    type: Boolean,
    default: false
  },

  created_by: String,
  supervisor_name: String,

  // High-level analytics
  total_items: Number,                // e.g., 50
  total_quantity: Number,            // e.g., 550
  
  // Efficiency metrics (optional)
  estimated_completion_time: String, // e.g., "6 hours"
  actual_duration_minutes: Number,   // Computed from all stages
  efficiency_percentage: Number,     // Computed: (actual vs planned)

  // Stage-wise timing
  hose_cutting: {
    type: StageTimeSchema,
    default: () => ({ ...defaultStage })
  },
  skiving: {
    type: StageTimeSchema,
    default: () => ({ ...defaultStage })
  },
  pre_assembly: {
    type: StageTimeSchema,
    default: () => ({ ...defaultStage })
  },
  crimping: {
    type: StageTimeSchema,
    default: () => ({ ...defaultStage })
  },
  testing: {
    type: StageTimeSchema,
    default: () => ({ ...defaultStage })
  },
  packing: {
    type: StageTimeSchema,
    default: () => ({ ...defaultStage })
  },

  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});


const ProductionProcess = mongoose.model("ProductionProcess", ProductionProcessSchema);

module.exports.ProductionProcess = ProductionProcess;


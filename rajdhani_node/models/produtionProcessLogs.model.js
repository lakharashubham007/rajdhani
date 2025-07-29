const mongoose = require('mongoose');

const ProductionProcessLogSchema = new mongoose.Schema({
  production_process_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionProcess",
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  operator_name: {
    type: String,
  },
  supervisor_name: {
    type: String,
  },
  stage: {
    type: String,
    enum: ['Hose-cutting', 'Skiving', 'Pre-assembly', 'Crimping', 'Testing', 'Packing', 'Production-Process-Started', 'Production-Process-Finished','Hose Cutting','Starting Stage','Start', 'Paused','Resume', 'Stopped'],
    required: true
  },
  title: {
    type: String,
  },
  log_message: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String,
    default: ''
  }
});


const ProductionProcessLog = mongoose.model("ProductionProcessLog", ProductionProcessLogSchema);

module.exports.ProductionProcessLog = ProductionProcessLog;
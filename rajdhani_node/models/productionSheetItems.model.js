const mongoose = require('mongoose');

const productionSheetItemSchema = new mongoose.Schema({
  production_sheet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductionSheet',  },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products',},
  party_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer',},
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SaleOrder',},
  part_no: { type: String },
  product_code: { type: String },
  uom: { type: String },
  weight: { type: String },
  price: { type: String },
  quantity: { type: String },
  gst: { type: String },
  hose: { type: String },
  hose_product_Code: { type: String },
  hose_fitting_Code: { type: String },
  hose_label: { type: String },
  fitting_a_description: { type: String },
  fitting_a_fitting_Code: { type: String },
  fitting_a_product_Code: { type: String },
  fitting_a_label: { type: String },
  fitting_b_description: { type: String },
  fitting_b_fitting_Code: { type: String },
  fitting_b_product_Code: { type: String },
  fitting_b_label: { type: String },
  assembly_length: { type: String },
  fitting_length: { type: String },
  cutting_length: { type: String },
  guard_type: { type: String },
  guard: { type: String },
  guard_prodcut_code: { type: String },
  guard_label: { type: String },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const ProductionSheetItem = mongoose.model('ProductionSheetItem', productionSheetItemSchema);

module.exports.ProductionSheetItem = ProductionSheetItem;

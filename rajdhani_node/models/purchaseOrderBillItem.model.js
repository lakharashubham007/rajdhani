const mongoose = require('mongoose');

const purchaseOrderBillItemSchema = new mongoose.Schema(
  {
    bill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrderBill', },
    po_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    product_name: { type: String, },
    product_code: { type: String },
    fitting_Code: { type: String },
    quantity: { type: Number },
    uom: { type: String },
    weight: { type: String },
    price: { type: String },
    discount_per_unit: { type: Number, default: 0 },
    amount: { type: String },
    cgst: { type: String },
    sgst: { type: String },
    igst: { type: String, default: 0 },
    cess: { type: String, default: 0 },
    ordered_quantity: { type: String },
    received_quantity: { type: String, default: 0 },
    verified_quantity: { type: String, default: 0 },
    is_short_close: { type: Boolean, default: false },
    return_item: {
      type: Boolean,
      default: false,
    },
    return_quantity: {   // New field for return quantity
      type: Number,
      default: 0
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const PurchaseOrderBillItem = mongoose.model('PurchaseOrderBillItem', purchaseOrderBillItemSchema);

module.exports.PurchaseOrderBillItem = PurchaseOrderBillItem;

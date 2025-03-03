const mongoose = require('mongoose');

const purchaseOrderItemSchema = new mongoose.Schema(
  {
    po_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
    product_name: { type: String },
    product_code: { type: String },
    quantity: { type: Number },
    uom: { type: String },
    weight: { type: String },
    price: { type: Number },
    discount_per_unit: { type: Number, default: 0 },
    taxable_amount: { type: Number },
    cgst: { type: Number },
    sgst: { type: Number },
    igst: { type: Number, default: 0 },
    cess: { type: Number, default: 0 },
    total_amount: { type: Number },
    ordered_quantity: { type: Number },
    received_quantity: { type: Number, default: 0 },
    verified_quantity: { type: Number, default: 0 },
    is_short_close: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);



const PurchaseOrderItem = mongoose.model('PurchaseOrderItem', purchaseOrderItemSchema);

module.exports.PurchaseOrderItem = PurchaseOrderItem;

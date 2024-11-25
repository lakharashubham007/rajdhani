const mongoose = require('mongoose');

const purchaseOrderItemSchema = new mongoose.Schema(
  {
    po_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
    product_name: { type: String },
    sku: { type: String },
    unit: { type: String },
    variant: { type: String },
    variant_type: { type: String },
    uom: { type: String },
    uom_qty: { type: Number },
    ordered_quantity: { type: Number },
    received_quantity: { type: Number, default: 0 },
    verified_quantity: { type: Number, default: 0 },
    quantity: { type: Number },
    price_per_unit: { type: Number },
    discount_per_unit: { type: Number, default: 0 },
    total_discount: { type: Number, default: 0 },
    cgst: { type: Number },
    sgst: { type: Number },
    igst: { type: Number, default: 0 },
    cess: { type: Number, default: 0 },
    amount: { type: Number },
    is_short_close: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const PurchaseOrderItem = mongoose.model('PurchaseOrderItem', purchaseOrderItemSchema);

module.exports.PurchaseOrderItem = PurchaseOrderItem;

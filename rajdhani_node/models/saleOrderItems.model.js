const mongoose = require('mongoose');

const saleOrderItemSchema = new mongoose.Schema(
  {
    so_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SaleOrder' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
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
    shipped_quantity: { type: Number, default: 0 },
    delivered_quantity: { type: Number, default: 0 },
    returned_quantity: { type: Number, default: 0 },
    is_cancelled: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const SaleOrderItem = mongoose.model('SaleOrderItem', saleOrderItemSchema);

module.exports.SaleOrderItem = SaleOrderItem;

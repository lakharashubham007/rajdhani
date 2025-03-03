const mongoose = require('mongoose');

const saleOrderSchema = new mongoose.Schema({
  voucher_no: { type: String, required: true, unique: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  order_details: {
    date: { type: String, required: true },
    due_date: { type: String, required: true },
    note: { type: String, default: "" },
  },
  summary: {
    total_quantity: { type: Number, required: true },
    shipped_quantity: { type: Number, default: 0 },
    remaining_quantity: { type: Number, default: 0 },
    sub_total: { type: Number, required: true },
    total_discount: { type: Number, default: 0 },
    total_gst_amount: { type: Number, required: true },
    grand_total: { type: Number, required: true },
  },
  billing_details: {
    name: { type: String },
    email: { type: String },
    mobile_no1: { type: String },
    mobile_no2: { type: String },
    country: { type: String },
    state_name: { type: String },
    city: { type: String },
    pin_code: { type: String },
    state_tin_code: { type: String },
    address: { type: String },
    gstin: { type: String },
  },
  shipping_details: {
    name: { type: String },
    address: { type: String },
    gstin: { type: String },
    country: { type: String },
    state_name: { type: String },
    city: { type: String },
    pin_code: { type: String },
    mobile_no1: { type: String },
    mobile_no2: { type: String },
    email: { type: String },
    state_tin_code: { type: String },
  },
  status: { type: String, default: 'Pending' }, // 'Pending', 'Shipped', 'Delivered', 'Cancelled'
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Adds createdAt and updatedAt fields
});

const SaleOrder = mongoose.model("SaleOrder", saleOrderSchema);

module.exports.SaleOrder = SaleOrder;

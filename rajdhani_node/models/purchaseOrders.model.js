const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  sku: { type: String, required: true },
  unit: { type: String, required: true },
  variant: { type: String, required: true },
  variant_type: { type: String },
  uom: { type: String, required: true },
  uom_qty: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price_per_unit: { type: Number, required: true },
  discount_per_unit: { type: Number, default: 0 },
  total_discount: { type: Number, default: 0 },
  cgst: { type: Number, required: true },
  sgst: { type: Number, required: true },
  igst: { type: Number, default: 0 },
  cess: { type: Number, default: 0 },
  amount: { type: Number, required: true },
});

const purchaseOrderSchema = new mongoose.Schema({
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  order_details: {
    date: { type: String, required: true },
    due_date: { type: String, required: true },
    note: { type: String, default: "" },
  },
  products: [productSchema],
  summary: {
    total_quantity: { type: Number, required: true },
    sub_total: { type: Number, required: true },
    total_discount: { type: Number, default: 0 },
    total_gst_amount: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    grand_total: { type: Number, required: true },
     
  },
}  ,{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Adds createdAt and updatedAt fields
}
    );

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

module.exports.PurchaseOrder = PurchaseOrder;

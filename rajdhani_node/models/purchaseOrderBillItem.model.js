const mongoose = require('mongoose');

const purchaseOrderBillItemSchema = new mongoose.Schema({
    bill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrderBill', required: true },
    product_name: { type: String, required: true },
    sku: { type: String, required: true },
    ordered_quantity: { type: Number, required: true },
    received_quantity: { type: Number, required: true },
    verified_quantity: { type: Number, required: true },
    price_per_unit: { type: Number, required: true },
    discount_per_unit: { type: Number, default: 0 },
    total_discount: { type: Number, default: 0 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    igst: { type: Number, default: 0 },
    cess: { type: Number, default: 0 },
    amount: { type: Number, required: true },
    is_short_close: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});


const PurchaseOrderBillItem = mongoose.model("PurchaseOrderBillItem", purchaseOrderBillItemSchema);

module.exports.PurchaseOrderBillItem = PurchaseOrderBillItem;
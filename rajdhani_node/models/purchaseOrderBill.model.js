const mongoose = require('mongoose');


const purchaseOrderBillSchema = new mongoose.Schema({
    bill_no: { type: String, required: true, unique: true },
    purchase_order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
    bill_date: { type: String, },
    bill_doc: { type: String, }, // Image file name
    note: { type: String, default: "" },
    bill_amount: { type: Number, },
    status: { type: String, default: 'Draft' }, // 'Draft', 'Finalized'
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});


const PurchaseOrderBill = mongoose.model("PurchaseOrderBill", purchaseOrderBillSchema);

module.exports.PurchaseOrderBill = PurchaseOrderBill;
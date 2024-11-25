const mongoose = require('mongoose');


const purchaseOrderBillSchema = new mongoose.Schema({
    bill_id: { type: String, required: true, unique: true },
    purchase_order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
    bill_date: { type: String, },
    bill_doc: { type: String, }, // Image file name
    note: { type: String, default: "" },
    // PO_amount: { type: Number, required: true },
    bill_amount: { type: Number, },
    status: { type: String, default: 'Draft' }, // 'Draft', 'Finalized'
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});


const PurchaseOrderBill = mongoose.model("PurchaseOrderBill", purchaseOrderBillSchema);

module.exports.PurchaseOrderBill = PurchaseOrderBill;
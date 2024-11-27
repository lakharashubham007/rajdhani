const mongoose = require('mongoose');

const purchaseOrderBillItemSchema = new mongoose.Schema(
  {
    bill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrderBill',  },
    po_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
    product_name: { type: String,  },
    sku: { type: String, },
    unit: { type: String },
    variant: { type: String },
    variant_type: { type: String },
    uom: { type: String },
    uom_qty: { type: Number },
    ordered_quantity: { type: Number,  },
    received_quantity: { type: Number,  },
    verified_quantity: { type: Number, },
    quantity: { type: Number },
    price_per_unit: { type: Number, },
    discount_per_unit: { type: Number, default: 0 },
    total_discount: { type: Number, default: 0 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    igst: { type: Number, default: 0 },
    cess: { type: Number, default: 0 },
    amount: { type: Number, required: true },
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

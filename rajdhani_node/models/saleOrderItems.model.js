const mongoose = require('mongoose');

const saleOrderItemSchema = new mongoose.Schema(
  {
    so_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SaleOrder' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    product_name: { type: String },
    product_code: { type: String },
    product_type: { type: String },
    fitting_Code: { type: String },
    quantity: { type: Number },
    uom: { type: String },
    weight: { type: String },
    price: { type: Number },
    discount_per_unit: { type: Number, default: 0 },
    taxable_amount: { type: Number },
    cgst: { type: Number },
    sgst: { type: Number },
    igst: { type: Number, default: 0 },
    total_amount: { type: Number },
    ordered_quantity: { type: Number },
    shipped_quantity: { type: Number, default: 0 },
    delivered_quantity: { type: Number, default: 0 },
    returned_quantity: { type: Number, default: 0 },
    ///logs maintianins 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins', },

    isUpdated: { type: Boolean, default: false },
    isUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins' },
    isCreaeted: { type: Boolean, default: false },
    isCreaetedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins' },
    isVerified: { type: Boolean, default: false },
    isVerifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins' },
    isAuthorized: { type: Boolean, default: false },
    isAuthorizedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins' },
    isCancelled: { type: Boolean, default: false },
    isCancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const SaleOrderItem = mongoose.model('SaleOrderItem', saleOrderItemSchema);

module.exports.SaleOrderItem = SaleOrderItem;

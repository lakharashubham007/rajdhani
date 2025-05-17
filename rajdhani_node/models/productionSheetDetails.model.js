const mongoose = require('mongoose');

const productionSheetSchema = new mongoose.Schema({
    party_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer',},
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SaleOrder',},
    sheet_no: { type: String, required: true },
    make: { type: String, required: true },
    date_time: { type: String, required: true },
    created_by: { type: String, required: true },
    order_no: { type: String, required: true },
    order_date: { type: String, required: true },
    party_name: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Pending' },
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const ProductionSheet = mongoose.model('ProductionSheet', productionSheetSchema);

module.exports.ProductionSheet = ProductionSheet;

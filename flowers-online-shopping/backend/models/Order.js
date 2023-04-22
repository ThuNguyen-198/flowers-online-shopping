const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    status: { type: String, required: true, enum: ["PLACED", "CANCLED", "CANCELED_BY_STORE", "READY", "SENT", "RECEIVED"] }, 
    cust_ID: { type: mongoose.Types.ObjectId, required: true, immutable: true },
    // Make these immutable?
    flowers: { type: [mongoose.Types.ObjectId], required: true },
    bouquets: { type: [mongoose.Types.ObjectId], required: true },
    other_items: { type: [mongoose.Types.ObjectId], required: true },
    total: { type: mongoose.Types.Decimal128, required: true }
    //can add more
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Order', orderSchema);

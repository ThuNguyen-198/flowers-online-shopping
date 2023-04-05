const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // primary keys should be unique
    oID: { type: mongoose.Types.ObjectId, required: true, unique: true, immutable: true },
    status: { type: String, required: true, enum: ["PLACED", "CANCLED", "CANCELED_BY_STORE", "READY", "SENT", "RECEIVED"] }, 
    // this should be a foreign key!
    cust_ID: { type: mongoose.Types.ObjectId, required: true, immutable: true },
    // Make these immutable?
    // this should be a list of foreign keys!
    flowers: { type: [mongoose.Types.ObjectId], required: true },
    // this should be a list of foreign keys!
    bouquets: { type: [mongoose.Types.ObjectId], required: true },
    // this should be a list of foreign keys!
    other_items: { type: [mongoose.Types.ObjectId], required: true },
    total: { type: mongoose.Types.Decimal128, required: true }
    //can add more
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // primary keys should be unique
    oID: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ["PLACED", "CANCLED", "CANCELED_BY_STORE", "READY", "SENT", "RECEIVED"] }, 
    // this should be a foreign key!
    cust_ID: { type: String, required: true },
    // this should be a list of foreign keys!
    flowers: { type: String, required: true },
    // this should be a list of foreign keys!
    bouquets: { type: String, required: true },
    // this should be a list of foreign keys!
    other_items: { type: String, required: true },
    total: { type: String, required: true }
    //can add more
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Order', orderSchema);

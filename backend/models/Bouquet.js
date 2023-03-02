const mongoose = require('mongoose');

const bouquetSchema = mongoose.Schema({
    bID: { type: String, required: true },
    customer_ID: { type: String, required: true },
    wrap_ID: { type: String, required: true },
    name: { type: String, required: true },
    flowers: { type: String, required: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Bouquet', bouquetSchema);


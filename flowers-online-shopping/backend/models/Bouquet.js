const mongoose = require('mongoose');

const bouquetSchema = mongoose.Schema({
    bID: { type: String, required: true },
    customer_ID: { type: String, required: false },
    wrap_ID: { type: String, required: true },
    name: { type: String, required: true },
    flowers: { type: Number, required: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Bouquet', bouquetSchema);


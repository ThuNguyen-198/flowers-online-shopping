const mongoose = require('mongoose');

const bouquetSchema = mongoose.Schema({
    customer_ID: { type: mongoose.Types.ObjectId, required: false, immutable: true },
    wrap_ID: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    flowers: { type: [mongoose.Types.ObjectId], required: true }
    // add current price?
});

//bouquetSchema.index({ customer_ID: 1, name: 1}, { unique: true });

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Bouquet', bouquetSchema);


const mongoose = require('mongoose');

const wrappingSchema = mongoose.Schema({
    // primary keys should be unique
    wID: { type: String, required: true, unique: true, immutable: true },
    name: { type: String, required: true },
    price: { type: mongoose.Types.Decimal128, required: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Wrapping', wrappingSchema);

const mongoose = require('mongoose');

const wrappingSchema = mongoose.Schema({
    wID: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Wrapping', wrappingSchema);

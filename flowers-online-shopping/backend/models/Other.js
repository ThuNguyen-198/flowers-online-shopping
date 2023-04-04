const mongoose = require('mongoose');

const otherSchema = mongoose.Schema({
    // primary keys should be unique
    prod_ID: { type: String, required: true, unique: true, immutable: true },
    desc: { type: String, required: true }, //allows search
    price: {type: mongoose.Types.Decimal128, required: true }
    //can add images here
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Other', otherSchema);

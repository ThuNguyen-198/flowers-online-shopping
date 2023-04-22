const mongoose = require('mongoose');

const otherSchema = mongoose.Schema({
    desc: { type: String, required: true }, //allows search
    price: {type: mongoose.Types.Decimal128, required: true }
    //can add images here
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Other', otherSchema);

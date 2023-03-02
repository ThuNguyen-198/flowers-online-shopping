const mongoose = require('mongoose');

const otherSchema = mongoose.Schema({
    prod_ID: { type: String, required: true },
    desc: { type: String, required: true }, //allows search
    price: { type: String, required: true }
    //can add images here
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Other', otherSchema);

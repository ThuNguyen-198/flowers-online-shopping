const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
    coID: { type: String, required: true },
    color: { type: String, required: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Color', colorSchema);





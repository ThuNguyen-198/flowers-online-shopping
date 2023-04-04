const mongoose = require('mongoose');


const colorSchema = mongoose.Schema({
    // primary keys should be unique
    coID: { type: mongoose.Types.ObjectId, required: true, unique: true, immutable: true },
    // this field should NOT be enum; it should be unique
    color: { type: String, required: true, unique: true, immutable: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Color', colorSchema);





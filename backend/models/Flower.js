const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
    fID: { type: String, required: true },
    color_ID: { type: String, required: true },
    kind_ID: { type: String, required: true }
});

// color and kind id are unique together
flowerSchema.index({ color_ID: 1, kind_ID: 1}, { unique: true });

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Flower', flowerSchema);

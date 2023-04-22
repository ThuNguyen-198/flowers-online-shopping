const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
    color_ID: { type: mongoose.Types.ObjectId, required: true, immutable: true },
    kind_ID: { type: mongoose.Types.ObjectId, required: true, immutable: true }
    // add current price?
});

// color and kind id are unique together
flowerSchema.index({ color_ID: 1, kind_ID: 1}, { unique: true });

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Flower', flowerSchema);

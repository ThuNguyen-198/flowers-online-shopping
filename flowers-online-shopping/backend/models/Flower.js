const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
    // primary keys should be unique
    //fID: { type: mongoose.Types.ObjectId, required: true, unique: true, immutable: true },
    // this should be a foreign key!
    color_ID: { type: mongoose.Types.ObjectId, required: true, immutable: true },
    // this should be a foreign key!
    kind_ID: { type: mongoose.Types.ObjectId, required: true, immutable: true }
    // add current price?
});

// color and kind id are unique together
flowerSchema.index({ color_ID: 1, kind_ID: 1}, { unique: true });

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Flower', flowerSchema);

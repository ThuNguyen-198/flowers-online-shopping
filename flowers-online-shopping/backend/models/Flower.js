const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
    // primary keys should be unique
    fID: { type: String, required: true, unique: true, immutable: true },
    // this should be a foreign key!
    color_ID: { type: String, required: true, immutable: true },
    // this should be a foreign key!
    kind_ID: { type: String, required: true, immutable: true }
});

// color and kind id are unique together
flowerSchema.index({ color_ID: 1, kind_ID: 1}, { unique: true });

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Flower', flowerSchema);

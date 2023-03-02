const mongoose = require('mongoose');


const flowerTypeSchema = mongoose.Schema({
    ftID: { type: String, required: true },
    kind: { type: String, required: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('FlowerType', flowerTypeSchema);

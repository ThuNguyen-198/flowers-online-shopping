const mongoose = require('mongoose');


const flowerTypeSchema = mongoose.Schema({
    kind: { type: String, required: true, unique: true, immutable: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('FlowerType', flowerTypeSchema);

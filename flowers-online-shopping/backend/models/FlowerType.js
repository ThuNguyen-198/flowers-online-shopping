const mongoose = require('mongoose');


const flowerTypeSchema = mongoose.Schema({
    // primary keys should be unique
    ftID: { type: String, required: true, unique: true },
    kind: { type: String, required: true, unique: true}
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('FlowerType', flowerTypeSchema);

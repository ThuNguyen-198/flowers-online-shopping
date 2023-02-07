const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  kind: { type: String, required: true },
  occasion: { type: String, required: true }
});

module.exports = mongoose.model('Flower', flowerSchema);
/*DATABASE SCHEMA

As what it is called, this JS file holds the schema, or, in others words,
the structure of how a database object should look like.

*/

// is this even used??? If not, delete it! If it is, delete Flower.js! They both export a model named "Flower"!!!

const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  kind: { type: String, required: true },
  occasion: { type: String, required: true }
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Flower', flowerSchema);
const mongoose = require("mongoose");

const bouquetSchema = mongoose.Schema({
  // primary keys should be unique
  //bID: { type: mongoose.Types.ObjectId, required: true, unique: true, immutable: true },
  // this should be a foreign key!
  customer_ID: {
    type: mongoose.Types.ObjectId,
    required: false,
    immutable: true,
  },
  // this should be a foreign key!
  wrap_ID: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  // this should be a list of foreign keys!
  flowers: { type: [mongoose.Types.ObjectId], required: true },
  // add current price?
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model("Bouquet", bouquetSchema);

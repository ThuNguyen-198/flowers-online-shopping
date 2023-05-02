const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const individualSchema = mongoose.Schema({
  email: { type: String },
  product: [
    {
      productName: { type: String },
      imageSmall: { type: String },
      productPrice: { type: Number },
      quantity: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Individual", individualSchema);
cartSchema.plugin(uniqueValidator);

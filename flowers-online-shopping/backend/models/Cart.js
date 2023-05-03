const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const cartSchema = mongoose.Schema({
  email: { type: String },
  product: [
    {
      productCode: { type: String },
      productName: { type: String },
      imageSmall: { type: String },
      productDescription: { type: String },
      productPrice: { type: Number },
      quantity: { type: Number },
    },
  ],
  individualID: { type: mongoose.Types.ObjectId },
});

module.exports = mongoose.model("Cart", cartSchema);
cartSchema.plugin(uniqueValidator);

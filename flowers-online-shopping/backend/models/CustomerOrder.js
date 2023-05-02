const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerInfo = Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
});

const customerOrderSchema = mongoose.Schema({
  products: [
    {
      productCode: { type: String },
      productName: { type: String },
      imageSmall: { type: String },
      productDescription: { type: String },
      productPrice: { type: Number },
      quantity: { type: Number },
    },
  ],
  customerInfo: { type: CustomerInfo },
  email: { type: String },
  total: { type: Number },
  date: { type: Date },
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model("CustomerOrder", customerOrderSchema);

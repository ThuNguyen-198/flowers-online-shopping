const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// store hashed value with argon2
// JJK: specifically, argon2id

const customerSchema = mongoose.Schema({
  user: { type: String, required: true, unique: true, immutable: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // do we REALLY want this unique???
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // I saw that someone added "isAdmin" to this for the main branch.
  // No. It doesn't make sense for a CUSTOMER to be an ADMIN.
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model("Customer", customerSchema);
customerSchema.plugin(uniqueValidator);

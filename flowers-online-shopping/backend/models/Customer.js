const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// store hashed value with argon2
// JJK: specifically, argon2id

const customerSchema = mongoose.Schema({
  // primary keys should be unique
  cuID: { type: String, unique: true, immutable: true },
  // these two should be merged and immutable!!!
  user: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // do we REALLY want this unique???
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model("Customer", customerSchema);
customerSchema.plugin(uniqueValidator);

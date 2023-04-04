const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// store hashed value with argon2

const customerSchema = mongoose.Schema({
  cuID: { type: String },
  user: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model("Customer", customerSchema);
customerSchema.plugin(uniqueValidator);

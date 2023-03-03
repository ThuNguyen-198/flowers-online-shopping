const mongoose = require('mongoose');

// store hashed value with argon2

const customerSchema = mongoose.Schema({
    cuID: { type: String, required: true },
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Customer', customerSchema);

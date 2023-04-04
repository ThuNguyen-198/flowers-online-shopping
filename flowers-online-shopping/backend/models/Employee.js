const mongoose = require('mongoose');

// store hashed value with argon2
// JJK: specifically, argon2id

const employeeSchema = mongoose.Schema({
    // primary keys should be unique
    eID: { type: String, required: true, unique: true, immutable: true },
    login_ID: { type: String, required: true, immutable: true },
    pwd: { type: String, required: true },
    perms: { type: Number, required: true } // value of 0 is lowest permissions
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Employee', employeeSchema);

/*
perms:
  
Base level is view-only. Followed by, adding to previous permissions: mark orders
as ready, mark orders as picked up (subject to certain conditions?), update inventory,
set prices, add types of things. 
*/

 

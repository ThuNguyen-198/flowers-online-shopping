const mongoose = require('mongoose');

const imageSchema= mongoose.Schema({
    // primary keys should be unique
    iID: { type: String, required: true, unique: true },
    // this should be a foreign key!
    bou_ID: { type: String, required: true },
    last_update: { type: Date, required: true }
    //[data] – some sort of data that lets the system find the image. 
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Image', imageSchema);

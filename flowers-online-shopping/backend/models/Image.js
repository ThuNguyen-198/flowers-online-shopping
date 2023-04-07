const mongoose = require('mongoose');

const imageSchema= mongoose.Schema({
    // primary keys should be unique
    //iID: { type: mongoose.Types.ObjectId, required: true, unique: true, immutable: true },
    // this should be a foreign key!
    bou_ID: { type: mongoose.Types.ObjectId, required: true, immutable: true },
    last_update: { type: Date, required: true, immutable: true }
    //[data] – some sort of data that lets the system find the image. 
});

//Export this as an object so we can use it somewhere else.
module.exports = mongoose.model('Image', imageSchema);

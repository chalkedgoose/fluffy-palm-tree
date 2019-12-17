const mongoose = require('mongoose');

const URLMappingSchema = new mongoose.Schema({
    href: {
        type: String,
        unique: true,
        required: true
    },
    uid: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports.URLMappingModel = mongoose.model('URLMapping', URLMappingSchema); 

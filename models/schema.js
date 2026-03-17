
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: { 
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    interest: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    }
})  

module.exports = mongoose.model('contact',contactSchema);

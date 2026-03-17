const mongoose = require('mongoose');  
const dotenv = require('dotenv');

dotenv.config();  

const Connection_String = process.env.Mongo;

const ConnectDb = async () => {
    try {
        console.log('Attempting to connect to:', Connection_String);
        await mongoose.connect(Connection_String);
        console.log("Successfully Connected to Mongo DB");
    } catch(err) {
        console.log('Error Connecting to Mongo DB:', err.message);
        console.log('Full error:', err);
    }   
}       

module.exports = ConnectDb; 
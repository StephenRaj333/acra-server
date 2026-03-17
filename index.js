const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const routes = require('./routes/route');

const Port = process.env.Port;  
const app = express();

app.use(cors());

// Middleware
app.use(express.json());  

// Routes
app.use(routes); 

app.listen(Port,() => {
    console.log(`Server Running of Port ${Port}`);
    console.log('Connected to Supabase!');
})

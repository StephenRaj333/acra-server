
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express.Router();
const dataFile = path.join(__dirname, "../data.json");

// Helper function to read data from JSON
const readData = () => {
    try {
        const data = fs.readFileSync(dataFile, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }   
};

// Helper function to write data to JSON
const writeData = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

app.get('/',(req,res) => {
    res.status(200).send(JSON.stringify('welcome Stephen !')); 
});

app.get('/api/get', (req,res) => {
    try {
        const contacts = readData();
        res.status(200).json({
            message: "All contacts",
            data: contacts 
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving contacts",
            error: err.message
        });
    }
})
    
// POST - Create a new contact
app.post("/api/contact", (req, res) => {  
    try {   
        const { name, company, website, email, interest, phone } = req.body;

        const newContact = {
            id: Date.now(),
            name, 
            company,
            website,
            email,
            interest,
            phone
        };

        const contacts = readData();
        contacts.push(newContact);
        writeData(contacts);

        res.status(201).json({
            message: "Contact created successfully",
            data: newContact
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating contact",
            error: err.message
        });
    }
});

// GET - Get all contacts
app.get("/contact", (req, res) => {
    try {
        const contacts = readData();
        res.status(200).json({
            message: "Contacts retrieved successfully",
            data: contacts
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving contacts",
            error: err.message
        });
    }
});

module.exports = app;


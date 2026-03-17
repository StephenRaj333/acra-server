
const express = require("express");
const supabase = require("../supabase");

const app = express.Router();

app.get('/', (req,res) => {
    res.status(200).send(JSON.stringify('welcome Stephen !'));
});

app.get('/api/get', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*');

        if (error) throw error;

        res.status(200).json({
            message: "All contacts",
            data: data
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving contacts",
            error: err.message
        });
    }
})
    
// POST - Create a new contact
app.post("/api/contact", async (req, res) => {  
    try {   
        const { name, company, website, email, interest, phone } = req.body;

        const { data, error } = await supabase
            .from('contacts')
            .insert([
                {
                    name,
                    company,
                    website,
                    email,
                    interest,
                    phone
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json({
            message: "Contact created successfully",
            data: data[0]
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating contact",
            error: err.message
        });
    }
});

// GET - Get all contacts
app.get("/contact", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*');

        if (error) throw error;

        res.status(200).json({
            message: "Contacts retrieved successfully",
            data: data
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving contacts",
            error: err.message
        });
    }
});

// DELETE - Delete a contact by ID
app.delete("/api/contact/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error; 

        res.status(200).json({
            message: "Contact deleted successfully",
            data: data
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting contact",
            error: err.message
        });
    }
});

module.exports = app;



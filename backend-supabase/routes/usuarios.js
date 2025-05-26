const express = require('express');
const router = express.Router();

// Import your Supabase client here
const { supabase } = require('../supabaseClient');

// Get all users
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Create a new user
router.post('/', async (req, res) => {
    const { nombre, email } = req.body;
    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nombre, email }]);

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// Update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    const { data, error } = await supabase
        .from('usuarios')
        .update({ nombre, email })
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
});

module.exports = router;
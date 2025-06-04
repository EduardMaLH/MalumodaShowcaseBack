const express = require('express');
const router = express.Router();

// Import your Supabase client here
const { supabase } = require('../supabaseClient');

// Get all user profiles
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('usuarios_perfil')
        .select('*');

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Get a user profile by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('usuarios_perfil')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Create a new user profile
router.post('/', async (req, res) => {
    const { nombre, email } = req.body;
    const { data, error } = await supabase
        .from('usuarios_perfil')
        .insert([{ nombre, email }]);

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// Update a user profile
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    const { data, error } = await supabase
        .from('usuarios_perfil')
        .update({ nombre, email })
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Delete a user profile
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('usuarios_perfil')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
});

module.exports = router;
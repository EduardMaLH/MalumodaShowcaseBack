const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Importa tu cliente supabase

// Get all products
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('productos')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (error) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(data);
});

// Create a new product
router.post('/', async (req, res) => {
    // Extraemos todos los campos esperados
    const {
        nombre,
        descripcion,
        marca,
        precio,
        tallas,
        categoria,
        tienda_id,
        imagen_url
    } = req.body;

    const { data, error } = await supabase
        .from('productos')
        .insert([{
            nombre,
            descripcion,
            marca,
            precio,
            tallas,       // Enviar como arreglo JSON, ejemplo: ["S", "M", "L"]
            categoria,
            tienda_id,
            imagen_url
        }])
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json(data);
});

// Update a product
router.put('/:id', async (req, res) => {
    const {
        nombre,
        descripcion,
        marca,
        precio,
        tallas,
        categoria,
        tienda_id,
        imagen_url
    } = req.body;

    const { data, error } = await supabase
        .from('productos')
        .update({
            nombre,
            descripcion,
            marca,
            precio,
            tallas,
            categoria,
            tienda_id,
            imagen_url
        })
        .eq('id', req.params.id)
        .select()
        .single();

    if (error) return res.status(404).json({ error: 'Producto no encontrado o actualización fallida' });

    res.json(data);
});

// Delete a product
router.delete('/:id', async (req, res) => {
    const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', req.params.id);

    if (error) return res.status(404).json({ error: 'Producto no encontrado o eliminación fallida' });

    res.status(204).send();
});

module.exports = router;


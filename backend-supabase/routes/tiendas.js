const express = require('express');
const router = express.Router();

// Sample data for stores (this would typically come from a database)
let tiendas = [];

// Get all stores
router.get('/', (req, res) => {
    res.json(tiendas);
});

// Get a store by ID
router.get('/:id', (req, res) => {
    const tienda = tiendas.find(t => t.id === parseInt(req.params.id));
    if (!tienda) return res.status(404).send('Store not found');
    res.json(tienda);
});

// Create a new store
router.post('/', (req, res) => {
    const nuevaTienda = {
        id: tiendas.length + 1,
        name: req.body.name,
        location: req.body.location
    };
    tiendas.push(nuevaTienda);
    res.status(201).json(nuevaTienda);
});

// Update a store
router.put('/:id', (req, res) => {
    const tienda = tiendas.find(t => t.id === parseInt(req.params.id));
    if (!tienda) return res.status(404).send('Store not found');

    tienda.name = req.body.name;
    tienda.location = req.body.location;
    res.json(tienda);
});

// Delete a store
router.delete('/:id', (req, res) => {
    const tiendaIndex = tiendas.findIndex(t => t.id === parseInt(req.params.id));
    if (tiendaIndex === -1) return res.status(404).send('Store not found');

    tiendas.splice(tiendaIndex, 1);
    res.status(204).send();
});

module.exports = router;
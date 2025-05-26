const express = require('express');
const router = express.Router();

// Mock data for products
let productos = [];

// Get all products
router.get('/', (req, res) => {
    res.json(productos);
});

// Get a product by ID
router.get('/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('Product not found');
    res.json(producto);
});

// Create a new product
router.post('/', (req, res) => {
    const producto = {
        id: productos.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    productos.push(producto);
    res.status(201).json(producto);
});

// Update a product
router.put('/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('Product not found');

    producto.name = req.body.name;
    producto.price = req.body.price;
    res.json(producto);
});

// Delete a product
router.delete('/:id', (req, res) => {
    const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (productoIndex === -1) return res.status(404).send('Product not found');

    productos.splice(productoIndex, 1);
    res.status(204).send();
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Obtener todas las noticias del blog
router.get('/', async (req, res) => {
  // Aquí irá la lógica para obtener las noticias
  res.send('Lista de noticias del blog');
});

// Crear una nueva noticia
router.post('/', async (req, res) => {
  // Aquí irá la lógica para crear una noticia
  res.send('Noticia creada');
});

// ...puedes agregar más rutas según lo necesites...

module.exports = router;
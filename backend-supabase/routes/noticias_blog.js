// routes/noticias_blog.js

const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Ajusta la ruta si hace falta

// --------------------------------------------------
// Obtener todas las noticias del blog
// --------------------------------------------------
router.get('/', async (req, res) => {
  try {
    // Reemplaza 'noticias_blog' por el nombre exacto de tu tabla
    const { data, error } = await supabase
      .from('noticias_blog')
      .select('*')
      .order('fecha_publicacion', { ascending: false }); // Opcional: ordena por fecha, descendente

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Obtener una noticia por ID
// --------------------------------------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('noticias_blog')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Crear una nueva noticia
// --------------------------------------------------
router.post('/', async (req, res) => {
  // Ejemplo de campos: titulo, contenido, autor, fecha_publicacion, imagen_url
  const {
    titulo,
    contenido,
    autor,
    fecha_publicacion, // Puedes omitir si tu tabla tiene DEFAULT now()
    imagen_url,
  } = req.body;

  try {
    const { data, error } = await supabase
      .from('noticias_blog')
      .insert([{
        titulo,
        contenido,
        autor,
        fecha_publicacion, // Si tu columna "fecha_publicacion" tiene default now(), no es estrictamente necesario enviarlo
        imagen_url,
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Actualizar una noticia existente
// --------------------------------------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    contenido,
    autor,
    fecha_publicacion,
    imagen_url,
  } = req.body;

  try {
    const { data, error } = await supabase
      .from('noticias_blog')
      .update({
        titulo,
        contenido,
        autor,
        fecha_publicacion,
        imagen_url,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({ error: 'Noticia no encontrada o actualización fallida' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Eliminar una noticia
// --------------------------------------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('noticias_blog')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(404).json({ error: 'Noticia no encontrada o eliminación fallida' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

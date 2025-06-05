// routes/usuarios_perfil.js

const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Asegúrate de exportar el cliente correctamente

// --------------------------------------------------
// Obtener todos los perfiles de usuario
// --------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuarios_perfil')
      .select('*')
      .order('creado_en', { ascending: false }); // Ordena por fecha de creación, descendente

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Obtener un perfil de usuario por ID (uuid)
// --------------------------------------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('usuarios_perfil')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Crear un nuevo perfil de usuario
// --------------------------------------------------
router.post('/', async (req, res) => {
  const { nombre, direccion, telefono, email } = req.body;

  // Validación mínima
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Los campos "nombre" y "email" son obligatorios' });
  }

  try {
    const { data, error } = await supabase
      .from('usuarios_perfil')
      .insert([
        {
          nombre,
          direccion: direccion || null,
          telefono: telefono || null,
          email,
          // No enviamos creado_en porque la BD debería usar DEFAULT now()
        }
      ])
      .select()
      .single(); // Devuelve un objeto, no un array

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Actualizar un perfil de usuario existente (uuid)
// --------------------------------------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, email } = req.body;

  // Validación básica: al menos uno de estos campos debe venir para actualizar
  if (!nombre && !direccion && !telefono && !email) {
    return res.status(400).json({ error: 'Debes enviar al menos un campo a actualizar' });
  }

  try {
    const { data, error } = await supabase
      .from('usuarios_perfil')
      .update({
        // Solo actualiza los campos que se envían
        ...(nombre !== undefined && { nombre }),
        ...(direccion !== undefined && { direccion }),
        ...(telefono !== undefined && { telefono }),
        ...(email !== undefined && { email }),
      })
      .eq('id', id)
      .select()
      .single(); // Devuelve el objeto actualizado

    if (error) {
      return res.status(404).json({ error: 'Perfil no encontrado o actualización fallida' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Eliminar un perfil de usuario (uuid)
// --------------------------------------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('usuarios_perfil')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(404).json({ error: 'Perfil no encontrado o eliminación fallida' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

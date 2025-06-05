const express = require('express');
const app = express();
const dotenv = require('dotenv');
const productosRoutes = require('./routes/productos');
const tiendasRoutes = require('./routes/tiendas');
const usuariosPerfilRouter = require('./routes/usuarios_perfil');
const noticiasBlogRouter = require('./routes/noticias_blog');

dotenv.config();

app.use(express.json());

app.use('/api/productos', productosRoutes);
app.use('/api/tiendas', tiendasRoutes);
app.use('/api/usuarios_perfil', usuariosPerfilRouter);
app.use('/api/noticias_blog', noticiasBlogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
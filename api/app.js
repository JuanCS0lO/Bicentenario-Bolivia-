/*const express = require('express'); // inicializar express
const filmRoutes = require('./routes/films'); // cargar ruta de films
const authRoutes = require('./routes/auth'); // cargar ruta de auth
const cors = require('cors');
const app = express();
 
app.use(cors());
app.use(express.json()); //inicializar express con JSON
app.use('/api/films', filmRoutes); // inicializar la ruta
app.use('/api/auth', authRoutes); // inicializar la ruta
module.exports = app;
*/

// api/app.js

const express = require('express');
const ciudadRoutes   = require('./routes/ciudades');
const hechoRoutes    = require('./routes/hechos');
const personajeRoutes= require('./routes/personajes');
const authRoutes     = require('./routes/auth');
const fuenteRoutes    = require('./routes/fuentes');
const cors           = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ciudades',   ciudadRoutes);
app.use('/api/hechos',     hechoRoutes);
app.use('/api/personajes', personajeRoutes);
app.use('/api/auth',         authRoutes);

module.exports = app;

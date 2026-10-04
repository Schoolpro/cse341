// Importa Express
const express = require('express');

// Crea el router principal
const router = express.Router();

// Importa el controller de la página principal
const homeController = require('../controllers/homeController');

// Importa las rutas de contacts
const contactsRoutes = require('./contacts');

// Ruta principal: GET /
router.get('/', homeController.getHome);

// Todas las rutas que empiecen con /contacts
// serán manejadas por el archivo contacts.js
router.use('/contacts', contactsRoutes);

// Exporta el router principal
module.exports = router;
// Importa Express
const express = require('express');

// Crea un router para las rutas de contacts
const router = express.Router();

// Importa las funciones del controller de contacts
const contactsController = require('../controllers/contactsController');

// GET /contacts
// Devuelve todos los contactos
router.get('/', contactsController.getAll);

// GET /contacts/:id
// ":id" representa el ID del contacto que escribimos en la URL
// Ejemplo: /contacts/6abb34146282d92bcf71a2d3
router.get('/:id', contactsController.getSingle);


// POST /contacts
// Crea un nuevo contacto
router.post('/', contactsController.createContact);

// PUT /contacts/:id
// Actualiza un contacto existente
router.put('/:id', contactsController.updateContact);

// DELETE /contacts/:id
// Elimina un contacto
router.delete('/:id', contactsController.deleteContact);




// Exporta el router para poder conectarlo con las otras rutas
module.exports = router;
// Importa nuestra conexión con MongoDB
const mongodb = require('../data/database');

// Importa ObjectId para poder trabajar con los IDs de MongoDB
const ObjectId = require('mongodb').ObjectId;


// Esta función obtiene todos los contactos
const getAll = async (req, res) => {

  const result = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .find();

  const contacts = await result.toArray();

  res.status(200).json(contacts);
}; // <-- AQUÍ TERMINA getAll


// Esta función obtiene un solo contacto usando su ID
const getSingle = async (req, res) => {

  // Toma el ID que viene en la URL
  const contactId = new ObjectId(req.params.id);

  // Busca el contacto que tenga ese _id
  const result = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .find({ _id: contactId });

  // Convierte el resultado en un array
  const contacts = await result.toArray();

  // Devuelve solamente el contacto encontrado
  res.status(200).json(contacts[0]);
};


// Exporta las dos funciones
module.exports = {
  getAll,
  getSingle
};
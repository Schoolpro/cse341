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


// Esta función crea un nuevo contacto
const createContact = async (req, res) => {

  // Crea un objeto con la información que recibimos
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  // Guarda el nuevo contacto en MongoDB
  const result = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .insertOne(contact);

  // Devuelve status 201 y el ID creado por MongoDB
  res.status(201).json({ id: result.insertedId });
};


// Esta función actualiza un contacto
const updateContact = async (req, res) => {

  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .replaceOne({ _id: contactId }, contact);

  res.status(204).send();
};


// Esta función elimina un contacto
const deleteContact = async (req, res) => {

  const contactId = new ObjectId(req.params.id);

  await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .deleteOne({ _id: contactId });

  res.status(200).send();
};





// Exporta las funciones
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact


};
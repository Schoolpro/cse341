// Importa el paquete de MongoDB
const mongodb = require('mongodb');

// Importa dotenv para poder leer las variables del archivo .env
const dotenv = require('dotenv');

// Carga las variables guardadas en .env
dotenv.config();

// MongoClient es la herramienta que usamos para conectarnos a MongoDB
const MongoClient = mongodb.MongoClient;

// Aquí guardaremos la conexión a la base de datos
let database;

// Esta función inicia la conexión con MongoDB
const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  // Se conecta usando el connection string guardado en .env
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // Guarda la conexión para poder usarla después
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      // Si hay un error de conexión, lo devuelve
      callback(err);
    });
};

// Esta función permite obtener la conexión desde otros archivos
const getDb = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

// Permite usar estas funciones desde otros archivos del proyecto
module.exports = {
  initDb,
  getDb
};
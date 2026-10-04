// Importa Express
const express = require('express');
const app = express();

// Importa nuestras rutas
const routes = require('./routes');

// Importa el archivo que maneja la conexión con MongoDB
const mongodb = require('./data/database');

// Usa el puerto de Render o 3000 cuando trabajamos localmente
const port = process.env.PORT || 3000;

// Conecta todas nuestras rutas
app.use('/', routes);

// Primero intentamos conectarnos a MongoDB
mongodb.initDb((err) => {
  if (err) {
    // Si MongoDB no conecta, mostramos el error
    console.log(err);
  } else {
    // Si MongoDB conecta correctamente, iniciamos el servidor
    app.listen(port, () => {
      console.log('Server is running on port ' + port);
    });
  }
});
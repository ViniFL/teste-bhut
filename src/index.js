const express = require('express');
const carsController = require('./controllers/carsController');

const app = express();
const port = 7000;

// Defina as rotas usando o controlador "carsController"
app.use('/api', carsController);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});






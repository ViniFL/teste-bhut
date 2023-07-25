// controllers/carsController.js
const express = require('express');
const router = express.Router();
const consumeApi = require('../services/apiConsumer');

// Rota para listar os carros
router.get('/listCars', async (req, res) => {
  try {
    const data = await consumeApi();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar carros.' });
  }
});

module.exports = router;
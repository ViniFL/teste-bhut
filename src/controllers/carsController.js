const express = require('express');
const router = express.Router();
const consumeApi = require('../services/apiConsumer');
const connectQueue = require('../services/rabbitmq');
const Log = require('../models/logModel');

router.get('/listCars', async (req, res) => {
  try {
    const data = await consumeApi();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar carros.' });
  }
});

router.post('/createCar', async (req, res) => {
  try {
    const newCar = req.body;

    if (!newCar || !newCar.brand || !newCar.model || !newCar.year) {
      return res.status(400).json({ error: 'Dados inválidos para criar o carro.' });
    }

    const car = await createCarInDatabase(newCar); 

    const logEntry = new Log({ car_id: car._id });
    await logEntry.save();

    const channel = await connectQueue();
    channel.sendToQueue('car_created_queue', Buffer.from(JSON.stringify(logEntry)), { persistent: true });

    res.json({ message: 'Carro criado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar carro.' });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find({}).sort({ data_hora: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar logs.' });
  }
});

module.exports = router;

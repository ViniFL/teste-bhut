const express = require('express');
const router = express.Router();
const consumeApi = require('../services/apiConsumer');
const connectQueue = require('../services/rabbitmq');
const Log = require('../models/logModel');

router.get('/listcars', async (req, res) => {
  try {
    const data = await consumeApi();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar carros.' });
  }
});

router.post('/createCar', async (req, res) => {
  try {
    const newCar = {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
    };

    const car = await createCarInDatabase(newCar); // Função que salva o carro no banco e retorna o objeto criado

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

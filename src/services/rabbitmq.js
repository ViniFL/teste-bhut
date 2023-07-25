const amqp = require('amqplib');

const QUEUE_NAME = 'car_created_queue';

const connectQueue = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log('Conexão com o RabbitMQ estabelecida.');

    return channel;
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error);
  }
};

module.exports = connectQueue;
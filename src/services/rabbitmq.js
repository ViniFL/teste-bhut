const amqp = require('amqplib');

const QUEUE_NAME = 'car_created_queue';

const connectQueue = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    return channel;
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectQueue;
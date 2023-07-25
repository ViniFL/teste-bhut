const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/meu_projeto_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com o MongoDB estabelecida.');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://vihnnyl:Vinicius06@cluster0.0gxxqge.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o banco de dados:'));
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

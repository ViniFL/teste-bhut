const axios = require('axios');

const apiUrl = 'http://api-test.bhut.com.br:3000/api/cars';

const consumeApi = async () => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Erro ao consumir a API:', error.message);
    throw error;
  }
};

module.exports = consumeApi;
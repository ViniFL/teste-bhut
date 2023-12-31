const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  data_hora: { type: Date, default: Date.now },
  car_id: { type: String, required: true },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
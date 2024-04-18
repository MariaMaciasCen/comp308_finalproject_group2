const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playername: String,
  playerxp: String,

});

module.exports = mongoose.model('Player', playerSchema);
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playername: String,
  playerxp: Number,

});

module.exports = mongoose.model('Player', playerSchema);
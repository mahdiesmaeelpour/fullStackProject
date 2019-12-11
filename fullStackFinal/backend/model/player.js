const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let player = new Schema({
  player_name: {
    type: String
  },
  player_rank: {
    type: String
  },
  player_score: {
    type: String
  },
  player_time: {
    type: String
  },
  player_favgame: {
    type: String
  },
  player_status: {
    type: Boolean
  },
  player_game: {
    type: String
  }
}, {
  collection: 'players'
})

module.exports = mongoose.model('player', player)
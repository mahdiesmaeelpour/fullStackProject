const express = require('express');
const app = express();
const playerRoute = express.Router();

// player model
let player = require('../model/player');

// Add player
playerRoute.route('/add-player').post((req, res, next) => {
  player.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all player
playerRoute.route('/').get((req, res) => {
  player.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single player
playerRoute.route('/read-player/:id').get((req, res) => {
  player.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update player
playerRoute.route('/update-player/:id').put((req, res, next) => {
  player.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('player successfully updated!')
    }
  })
})

// Delete player
playerRoute.route('/delete-player/:id').delete((req, res, next) => {
  player.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = playerRoute;
const express = require('express');
const router = express.Router();

const db = require('../models/index.js');
const Games = db.games;


router.get('/', function(req, res, next) {
  Games.findAll({
    attributes: [
      'id',
      'name',
      'code'
  ]}).then(games => {
    if(!games) throw new Error("Игры не найдено");
    console.log('find games: ', games.length);
    res.send(games);
  }).catch((err) => {
    next(err);
  })
});


router.get('/:game_id', function(req, res, next) {
  const gameId = req.params.game_id;

  Games.findById(gameId).then(game => {
    if(!game) throw new Error("Игры с таким кодом не найдено");
    res.send({
      id: game.id,
      name: game.name,
      code: game.code
    });
  }).catch((err) => {
    next(err);
  })
});


router.post('/', function(req, res, next) {
  const data = req.body;

  if (!data.code) throw new Error("Не передан код");
  if (!data.name) throw new Error("Не передано имя");

  const game = new Games();
  game.name = data.name;
  game.code = data.code;
  game.save().then((game) => {
    res.send({
      id: game.id,
      name: game.name,
      code: game.code
    });
  }).catch(err => {
    next(err);
  });
});


router.put('/:game_id', function(req, res, next) {
  const gameId = req.params.game_id;
  const data = req.body;

  Promise.resolve().then(() => {
    if (!data.code) throw new Error('Не передан code');
    if (!data.name) throw new Error('Не передано имя');
  }).then(() => {
    return Games.findById(gameId);
  }).then(game => {
    if (!game) throw new Error('Такой игры в базе нет');
    game.name = data.name;
    game.code = data.code;
    return game.save();
  }).then(game => {
    return res.send({
      id: game.id,
      name: game.name,
      code: game.code
    });
  }).catch(err => {
    next(err);
  })
});


router.delete('/:game_id', function(req, res, next) {
  const game_id = req.params.game_id;
  Games.findById(game_id).then(game => {
    if(!game) throw new Error("Игры с таким кодом не найдено");
    return game.destroy();
  }).then(() => {
    return res.send("game destroyed");
  }).catch((err) => {
    next(err);
  })
});

module.exports = router;

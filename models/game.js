'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here 
      }
    }
  });

  Game.findByCode = function (code) {
    return Game.findOne({
      where: {code: code}
    })
  };

  return Game;
};

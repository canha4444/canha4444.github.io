const {Sequelize} = require('sequelize');

const sequelize = require('../util/sequelizeDB');

const Character = sequelize.define('character',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: Sequelize.STRING,
      CV: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatarURL: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imageURL: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      introduce: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

module.exports = Character;

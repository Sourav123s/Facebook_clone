'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  friends.init({
    Person_1: DataTypes.INTEGER,
    Person_2: DataTypes.INTEGER,
    Time_Stamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'friends',
  });
  return friends;
};
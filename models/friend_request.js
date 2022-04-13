'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friend_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  friend_request.init({
    request_send_by: DataTypes.INTEGER,
    request_recived_by: DataTypes.INTEGER,
    request_status: DataTypes.ENUM("P","R")
  }, {
    sequelize,
    modelName: 'friend_request',
  });
  return friend_request;
};
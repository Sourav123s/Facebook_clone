'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    First_Name: DataTypes.STRING,
    Last_Name: DataTypes.STRING,
    Dob: DataTypes.DATE,
    Password: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone_Number: DataTypes.STRING,
    Profile_pic: DataTypes.STRING,
    Cover_Pic: DataTypes.STRING,
    About: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_like_by_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post_like_by_user.init({
    Post_Id: DataTypes.INTEGER,
    Post_Created_By: DataTypes.INTEGER,
    Post_Liked_By: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post_like_by_user',
  });
  return post_like_by_user;
};
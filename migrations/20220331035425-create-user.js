'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      First_Name: {
        type: Sequelize.STRING
      },
      Last_Name: {
        type: Sequelize.STRING
      },
      Dob: {
        type: Sequelize.DATE
      },
      Password: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Phone_Number: {
        type: Sequelize.STRING
      },
      Profile_pic: {
        type: Sequelize.STRING
      },
      Cover_Pic: {
        type: Sequelize.STRING
      },
      About: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
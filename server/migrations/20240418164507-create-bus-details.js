'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bus_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      bus_type: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.STRING
      },
      route: {
        type: Sequelize.STRING
      },
      departure_time: {
        type: Sequelize.STRING
      },
      arrival_time: {
        type: Sequelize.STRING
      },
      fare: {
        type: Sequelize.STRING
      },
      operator_id: {
        type: Sequelize.INTEGER
      },
      departure_location: {
        type: Sequelize.STRING
      },
      arrival_location: {
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
    await queryInterface.dropTable('bus_details');
  }
};
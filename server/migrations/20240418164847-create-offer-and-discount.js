'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offer_and_discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      offer_name: {
        type: Sequelize.STRING
      },
      discount_percentage: {
        type: Sequelize.INTEGER
      },
      valid_from: {
        type: Sequelize.STRING
      },
      valid_to: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
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
    await queryInterface.dropTable('offer_and_discounts');
  }
};
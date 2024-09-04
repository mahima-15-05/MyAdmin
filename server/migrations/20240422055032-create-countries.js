'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sort_name: {
        type: Sequelize.STRING
      },
      numeric_code: {
        type: Sequelize.STRING
      },
      iso2: {
        type: Sequelize.STRING
      },
      phone_code: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:1
      },
      capital: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      currency_name: {
        type: Sequelize.STRING
      },
      currency_symbol: {
        type: Sequelize.STRING
      },
      tld: {
        type: Sequelize.STRING
      },
      native: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      region_id: {
        type: Sequelize.STRING
      },
      subregion: {
        type: Sequelize.STRING
      },
      subregion_id: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      timezones: {
        type: Sequelize.TEXT
      },
      translations: {
        type: Sequelize.TEXT
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      emoji: {
        type: Sequelize.STRING
      },
      emojiU: {
        type: Sequelize.STRING
      },
      flag: {
        type: Sequelize.BOOLEAN,
        defaultValue:1
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
    await queryInterface.dropTable('countries');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('home-sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invite_image: {
        type: Sequelize.STRING
      },
      connect_section_banner: {
        type: Sequelize.STRING
      },
      email_sec_banner: {
        type: Sequelize.STRING
      },
      invite_heading: {
        type: Sequelize.STRING
      },
      invite_subheading: {
        type: Sequelize.TEXT
      },
      invite_description: {
        type: Sequelize.TEXT
      },
      invite_link: {
        type: Sequelize.STRING
      },
      connect_sec_heading: {
        type: Sequelize.STRING
      },
      connect_sec_description: {
        type: Sequelize.TEXT
      },
      connect_sec_link: {
        type: Sequelize.STRING
      },
      email_sec_heading: {
        type: Sequelize.STRING
      },
      email_sec_summary: {
        type: Sequelize.TEXT
      },
      email_sec_subtitle: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('home-sections');
  }
};
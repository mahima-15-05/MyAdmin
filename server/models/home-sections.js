'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class homeSections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  homeSections.init({
    invite_image: DataTypes.STRING,
    connect_section_banner: DataTypes.STRING,
    email_sec_banner: DataTypes.STRING,
    invite_heading: DataTypes.STRING,
    invite_subheading: DataTypes.TEXT,
    invite_description: DataTypes.TEXT,
    invite_link: DataTypes.STRING,
    connect_sec_heading: DataTypes.STRING,
    connect_sec_description: DataTypes.TEXT,
    connect_sec_link: DataTypes.STRING,
    email_sec_heading: DataTypes.STRING,
    email_sec_summary: DataTypes.TEXT,
    email_sec_subtitle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'home-sections',
  });
  return homeSections;
};
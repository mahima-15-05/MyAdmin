'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class terms_and_conditions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  terms_and_conditions.init({
    terms_and_conditions_text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'terms_and_conditions',
  });
  return terms_and_conditions;
};
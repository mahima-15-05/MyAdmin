'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  operator.init({
    operator_name: DataTypes.STRING,
    operator_contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'operator',
  });
  return operator;
};
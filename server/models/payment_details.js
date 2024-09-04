'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment_details.init({
    User_id: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    payment_date: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    transaction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment_details',
  });
  return payment_details;
};
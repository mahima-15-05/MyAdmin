'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class offer_and_discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  offer_and_discount.init({
    offer_name: DataTypes.STRING,
    discount_percentage: DataTypes.INTEGER,
    valid_from: DataTypes.STRING,
    valid_to: DataTypes.STRING,
    description: DataTypes.TEXT,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'offer_and_discount',
  });
  return offer_and_discount;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cities.init({
    name: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    state_code: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    country_code: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'cities',
  });
  return cities;
};
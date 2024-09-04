'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bus_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bus_details.init({
    name: DataTypes.STRING,
    bus_type: DataTypes.STRING,
    capacity: DataTypes.STRING,
    route: DataTypes.STRING,
    departure_time: DataTypes.STRING,
    arrival_time: DataTypes.STRING,
    fare: DataTypes.STRING,
    operator_id: DataTypes.INTEGER,
    departure_location: DataTypes.STRING,
    arrival_location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bus_details',
  });
  return bus_details;
};
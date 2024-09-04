'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking_details.init({
    User_id: DataTypes.INTEGER,
    bus_id: DataTypes.INTEGER,
    seat_number: DataTypes.STRING,
    booking_date: DataTypes.STRING,
    total_fare: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    payment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'booking_details',
  });
  return booking_details;
};
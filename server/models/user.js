'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    dob:DataTypes.STRING,
    gender:DataTypes.STRING,
    address:DataTypes.TEXT,
    profile_photo: DataTypes.STRING,
    password:DataTypes.STRING,
    otp:DataTypes.STRING,
    status:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
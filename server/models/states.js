'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class states extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  states.init({
    name: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    country_code: DataTypes.STRING,
    fips_code: DataTypes.STRING,
    iso2: DataTypes.STRING,
    type: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'states',
  });
  return states;
};
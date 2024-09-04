'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  countries.init({
    name: DataTypes.STRING,
    sort_name: DataTypes.STRING,
    numeric_code: DataTypes.STRING,
    iso2: DataTypes.STRING,
    phone_code: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    capital: DataTypes.STRING,
    currency: DataTypes.STRING,
    currency_name: DataTypes.STRING,
    currency_symbol: DataTypes.STRING,
    tld: DataTypes.STRING,
    native: DataTypes.STRING,
    region: DataTypes.STRING,
    region_id: DataTypes.STRING,
    subregion: DataTypes.STRING,
    subregion_id: DataTypes.STRING,
    nationality: DataTypes.STRING,
    timezones: DataTypes.TEXT,
    translations: DataTypes.TEXT,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    emoji: DataTypes.STRING,
    emojiU: DataTypes.STRING,
    flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'countries',
  });
  return countries;
};
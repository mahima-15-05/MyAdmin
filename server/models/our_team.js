'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class our_team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  our_team.init({
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    image: DataTypes.STRING,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'our_team',
  });
  return our_team;
};
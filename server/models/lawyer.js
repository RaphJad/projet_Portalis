'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lawyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lawyer.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    lawyer_id: DataTypes.STRING,
    status: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lawyer',
  });
  return lawyer;
};
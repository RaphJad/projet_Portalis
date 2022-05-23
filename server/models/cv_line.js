'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cv_line extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cv_line.init({
    content: DataTypes.STRING,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    lawyer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cv_line',
  });
  return cv_line;
};
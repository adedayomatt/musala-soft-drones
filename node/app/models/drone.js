'use strict';
const { allModels } = require("app/constants/models");
const { IDLE, allStates } = require("app/constants/states");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Drone.init({
    serialNumber: DataTypes.STRING,
    model: {
      type: DataTypes.ENUM,
      values: allModels(),
    },
    weightLimit: DataTypes.FLOAT,
    batteryCapacity: DataTypes.INTEGER,
    state: {
      type: DataTypes.ENUM,
      values: allStates(),
      defaultValue: IDLE
    },
  }, {
    sequelize,
    modelName: 'Drone',
  });
  return Drone;
};
'use strict';
const { LOADED, DELIVERING, DELIVERED } = require("app/constants/states");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Drone }) {
      Medication.belongsTo(Drone, {
        as: "drone"
      })
    }
  }
  Medication.init({
    droneId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    code: DataTypes.STRING,
    image: DataTypes.STRING,
    state: {
      type: DataTypes.ENUM,
      values: [ LOADED, DELIVERING, DELIVERED ],
      defaultValue: LOADED
    },
  }, {
    sequelize,
    modelName: 'Medication',
  });
  return Medication;
};
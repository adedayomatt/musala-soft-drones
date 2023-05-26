'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DroneBatteryAudit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Drone }) {
      DroneBatteryAudit.belongsTo(Drone, {
        as: "drone"
      })
    }
  }
  DroneBatteryAudit.init({
    droneId: DataTypes.INTEGER,
    state: DataTypes.STRING,
    batteryLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DroneBatteryAudit',
  });
  return DroneBatteryAudit;
};
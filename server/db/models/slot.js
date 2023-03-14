'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Slot.hasMany(models.Schedule, { foreignKey: 'slotId' });
    }
  }
  Slot.init({
    id: DataTypes.INTEGER,
    timeGap: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Slot',
  });
  return Slot;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shedule.belongsTo(models.User, { foreignKey: 'userId' });
      Shedule.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
      Shedule.belongsTo(models.Slot, { foreignKey: 'slotId' });
    }
  }
  Shedule.init({
    id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    slotId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    statusAppointment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shedule',
  });
  return Shedule;
};

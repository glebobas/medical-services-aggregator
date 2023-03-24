'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'userId' });
      Message.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
      Message.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
    }
  }
  Message.init({
    userId: DataTypes.INTEGER,
    textMessage: DataTypes.TEXT,
    subject: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    clinicName: DataTypes.STRING,
    doctorName: DataTypes.STRING,
    dateAppointment: DataTypes.DATEONLY,
    time: DataTypes.STRING,
    doctorSpeciality: DataTypes.STRING,
    dateMessage: DataTypes.DATE,
    doctorId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};

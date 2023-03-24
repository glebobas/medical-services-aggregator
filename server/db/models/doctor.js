'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsTo(models.Speciality, { foreignKey: 'specialityId' });
      Doctor.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
      Doctor.belongsToMany(models.User, { through: 'UserDoctor', foreignKey: 'doctorId' });
      Doctor.hasMany(models.Shedule, { foreignKey: 'doctorId' });
      Doctor.hasMany(models.Rating, { foreignKey: 'doctorId' });
      Doctor.hasMany(models.Review, { foreignKey: 'doctorId' });
      Doctor.hasMany(models.Message, { foreignKey: 'doctorId' });
    }
  }
  Doctor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    specialityId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    generalTiming: DataTypes.STRING,
    adultPatients: DataTypes.BOOLEAN,
    childrenPatients: DataTypes.BOOLEAN,
    generalInfo: DataTypes.TEXT,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};

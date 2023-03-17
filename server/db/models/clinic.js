'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.belongsToMany(models.User, { through: 'UserClinic', foreignKey: 'clinicId' });
      Clinic.hasMany(models.Doctor, { foreignKey: 'clinicId' });
      Clinic.hasMany(models.Rating, { foreignKey: 'clinicId' });
      Clinic.belongsTo(models.Address, { foreignKey: 'addressId' });

    }
  }
  Clinic.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    generalnfo: DataTypes.TEXT,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};

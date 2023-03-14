'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserClinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // UserClinic.belongsTo(models.User, { foreignKey: 'userId' });
      // UserClinic.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
    }
  }
  UserClinic.init({
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserClinic',
  });
  return UserClinic;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDoctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // UserDoctor.belongsTo(models.User, { foreignKey: 'userId' });
      // UserDoctor.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
    }
  }
  UserDoctor.init({
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    readyToRate: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserDoctor',
  });
  return UserDoctor;
};

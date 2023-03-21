'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctor_review: DataTypes.TEXT,
    clinic_review: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};

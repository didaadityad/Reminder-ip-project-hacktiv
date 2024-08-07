'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicine.belongsTo(models.User, {
        foreignKey: `UserId`
      })

      Medicine.belongsTo(models.Reminder, {
        foreignKey: `ReminderId`
      })
    }
  }
  Medicine.init({
    medicineName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ReminderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};
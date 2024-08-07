'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reminder.belongsTo(models.User, {
        foreignKey: `UserId`
      })

      Reminder.hasMany(models.Medicine, {
        foreignKey: 'ReminderId'
      })
    }
  }
  Reminder.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reminder',
  });
  return Reminder;
};
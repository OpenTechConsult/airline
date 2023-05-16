'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.FlightSchedules = this.hasMany(models.FlightSchedules)
    }
  }
  Airplane.init({
    planeModel: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Plane types should not be empty'
        }
      }
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'A plane must have at least one seat'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};
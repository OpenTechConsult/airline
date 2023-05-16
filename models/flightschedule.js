'use strict';
const {
  Model
} = require('sequelize');
const availableAirports = [
  'MIA',
  'jfk',
  'LAX'
]
module.exports = (sequelize, DataTypes) => {
  class FlightSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.Airplane = this.belongsTo(models['Airplane'])
      this.BoardingTickets = this.hasMany(models['BoardingTicket'])
    }
  }
  FlightSchedule.init({
    originAirport: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [availableAirports],
          msg: 'Invalid origin airport'
        }
      }
    },
    destinationAirport: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [availableAirports],
          msg: 'Invalid destination airport'
        }
      }
    },
    departureTime: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'Invalid departure time'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'FlightSchedule',
    validate: {
      validDestination() {
        const hasAirportValues = this.originAirport !== null 
                && this.destinationAirport !== null
        const invalidDestination = this.originAirport === this.destinationAirport
        if (hasAirportValues && invalidDestination) {
          throw new Error("The destination airport cannot be the same as the origin")
        } 
      }
    }
  });
  return FlightSchedule;
};
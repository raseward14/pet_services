const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Appointment extends Model { }

Appointment.init(
    {
        //isn't this default?
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //the account scheduling, from Account.js
        //Employees could schedule an appointment.
        //Will need some checking to be sure they're not self-scheduling.
        //That's for later.
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        //The employee doing it, from Employee.js
        employeeId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timeSlot: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'appointment',
    }
);

module.exports = Appointment;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Employee extends Model { }

Employee.init(
    {
        //isn't this default?
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        accountid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slotHrs: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shiftStart: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shiftEnd: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        week1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        week2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        week3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        week4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalSlots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'employee',
    }
);

module.exports = Employee;
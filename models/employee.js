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
        timeSlots: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('timeSlots').split(';')
            },
            set(val) {
                this.setDataValue('timeSlots', val.join(';'));
            }

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
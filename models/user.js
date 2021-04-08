// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');


// class User extends Model { }

// User.init(
//     {
//         //isn't this default?
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         pet_name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         shiftStart: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         shiftEnd: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         timeSlots: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             get() {
//                 return this.getDataValue('timeSlots').split(';')
//             },
//             set(val) {
//                 this.setDataValue('timeSlots', val.join(';'));
//             }

//         },
//         totalSlots: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         }
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'user',
//     }
// );

// module.exports = User;
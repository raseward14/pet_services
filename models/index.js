const Employee = require('./employee');
const Account = require('./Account')
const Appointment = require('./Appointment')

Account.hasMany(Appointment, {
    foreignKey: 'account_id',
    onDelete: 'CASCADE',

});

Appointment.belongsTo(Account, {
    foreignKey: 'account_id',

});

// Employee.hasMany(Appointment, {
//     foreignKey: 'employee_id',
//     onDelete: 'CASCADE',

// });

// Employee.belongsTo(Account, {
//     foreignKey: 'id',

// });


module.exports = { Employee, Account, Appointment };

const sequelize = require('../config/connection');
const { Employee } = require('../models');
//Name, Job, Timeslot length, shift start, shift end, generate "timeslots" call them by index, total timeslots

//lunch is 11-12

console.log(Employee)
const employeeData = require('./employeeData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    let betterEmployeeData;
    // console.log(betterEmployeeData)
    betterEmployeeData = makeBetterEmployeeData(employeeData)
    console.log(employeeData)
    console.log(betterEmployeeData)


    await Employee.bulkCreate(betterEmployeeData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase()
//work for 8 or more hours and you get a paid lunch.

const makeBetterEmployeeData = (employeeDatums) => {
    let betterEmployeeData = []
    let totalSlots;
    employeeDatums.forEach(element => {
        let start = element.shiftStart;
        let end = element.shiftEnd;
        //Work over 8 hours, and you get a lunch?
        //would need another column for when lunch starts, nevermind.
        // if (end - start >= 8) {
        //     console.log("They get a lunch")
        //     totalSlots = end - start - 1
        // } else {
        //     totalSlots = end - start
        // }

        // static lunch
        if (start < 11 && end > 12) {
            console.log("They get a lunch!")
            totalSlots = end - start - 1
        } else {
            totalSlots = end - start
        }
        let arr = []
        for (let index = 0; index < totalSlots; index++) {
            arr.push(index)
        }

        betterEmployeeData.push(
            {
                "name": element.name,
                "job": element.job,
                "slotMins": element.timeslotLenMinutes,
                "shiftStart": start,
                "shiftEnd": end,
                "timeSlots": arr,
                "totalSlots": totalSlots

            }
        )

    })
    return betterEmployeeData

}


// testing();
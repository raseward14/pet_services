const sequelize = require('../config/connection');
const { Account, Employee, Appointment } = require('../models');
//Name, Job, Timeslot length, shift start, shift end, generate "timeslots" call them by index, total timeslots

//lunch is 11-12
const today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
console.log(date)
console.log(Employee)
const employeeData = require('./employeeData.json');
const accountData = require("./accountData.json");
const appointmentData = require("./appointmentData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    let betterEmployeeData;
    // console.log(betterEmployeeData)
    betterEmployeeData = makeBetterEmployeeData(employeeData)
    // console.log(employeeData)
    // console.log(betterEmployeeData)


    await Employee.bulkCreate(betterEmployeeData, {
        //Makes creation non-parallel, so it's deterministic.
        //individualHooks: true,
        returning: true,
    });

    await Account.bulkCreate(accountData, {
        individualHooks: true,
        returning: true,
    })

    //Appointments will be stitched together in a more thorough way in another place.
    //This is JUST a seed, it does not affect the employee schedule.
    await Appointment.bulkCreate(appointmentData, {
        // individualHooks: true,
        returning: true
    })
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
        let daysWorking = element.daysWorking;
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
            // console.log("They get a lunch!")
            totalSlots = end - start - 1
        } else {
            totalSlots = end - start
        }

        let arr = []
        //Build weekly schedule based on shifts, and days working.

        let weeks = []
        // for (let index = 0; index < element.daysWorking.length; index++) {
        //     let innerArr = []
        //     const thing = element.daysWorking[index];
        //     innerArr.push(thing)
        //     for (let index = 0; index < totalSlots; index++) {
        //         innerArr.push(index)
        //     }
        //     arr.push(innerArr.join(","))
        // }
        let startDate = new Date(today)

        // console.log(startDate)
        for (let index = 0; index < 4; index++) {
            let workingWeek = []
            for (let index = 0; index < 7; index++) {
                let curDay = []
                // let dayOfTheWeek = startDate.getDay();
                curDay.push(startDate.getFullYear() + '-' + (startDate.getMonth()) + '-' + startDate.getDate())
                startDate.setDate(startDate.getDate() + 1)
                //make sure the day we're assigning works?
                //I don't know man.
                if (element.daysWorking.includes(startDate.getDay())) {
                    for (let index = 0; index < totalSlots; index++) {
                        // const element = array[index];
                        curDay.push(index)
                    }
                }

                workingWeek.push(curDay.join(';'))
                // today = new Date(today.getDate() + 1)
                // today = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1));
                //today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            }
            weeks.push(workingWeek.join("/"))
            // console.log(workingWeek)
        }
        // console.log(weeks)

        betterEmployeeData.push(
            {
                "name": element.name,
                "job": element.job,
                "slotHrs": element.timeslotLenHrs,
                "shiftStart": start,
                "shiftEnd": end,
                "timeSlots": arr,
                "totalSlots": totalSlots,
                "accountid": element.accountid,
                "week1": weeks[0],
                "week2": weeks[1],
                "week3": weeks[2],
                "week4": weeks[3],

            }
        )

    })
    return betterEmployeeData

}


// testing();
//pass in a single week, get an easy to use object out
//Empty days should probably be included to make searching simpler, huh.
//Yeah, that makes sense.
//2021-4-10/2021-4-11;0;1;2;3;4;5;6/2021-4-12;0;1;2;3;4;5;6/2021-4-13;0;1;2;3;4;5;6/2021-4-14;0;1;2;3;4;5;6/2021-4-15;0;1;2;3;4;5;6/2021-4-16
//so turn it into an object of days, each day having an array of timeslots.
//looks good
const sequelize = require('../config/connection');
const { Account, Employee, Appointment } = require('../models');

function dbScheduleToObj(dbThing) {
    let arrOfDays = dbThing.split("/")
    let returnObj = {}
    for (let index = 0; index < arrOfDays.length; index++) {
        const element = arrOfDays[index].split(";");
        if (element.length == 1) {
            returnObj[element[0]] = false
        } else {
            returnObj[element[0]] = element.slice(1)
        }
    }
    return returnObj
}


function dbObjToString(dbObj) {
    // console.log(dbObj)
    let weekArr = [];
    for (const key in dbObj) {
        if (dbObj.hasOwnProperty.call(dbObj, key)) {
            const arr = dbObj[key];

            let newArr = []
            newArr.push(key)
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                newArr.push(element)
            }
            let newStr = newArr.join(";")
            // console.log(newStr)
            weekArr.push(newStr)

        }
    }
    return weekArr.join("/")

}

//So this takes in an account ID, employee ID, date, timeslot, and schedule obj
//And then makes a new appointment, and removes the timeslot from the schedule obj.
async function scheduleAppt(accountIdParam, employeeIdParam, dateParam, timeslotParam, scheduleObj) {

    await sequelize.sync({ force: true })((err) => res.json(err));;
    works
    const appt = await Appointment.create({
        employeeId: employeeIdParam,
        accountId: accountIdParam,
        timeSlot: timeslotParam,
        date: dateParam
    }).catch((err) => console.log(err));
    let scheduleDay = scheduleObj[dateParam]
    scheduleDay = scheduleDay.filter(item => parseInt(item) !== timeslotParam)
    scheduleObj[dateParam] = scheduleDay
    Employee.update(
        {
            week1: dbObjToString(scheduleObj)
        },
        {
            where: {
                id: employeeIdParam
            }
        }
    ).catch((err) => console.log(err))
}


// scheduleAppt(1, 1, "2021-4-12", 0, dbScheduleToObj("2021-4-10/2021-4-11;0;1;2;3;4;5;6/2021-4-12;0;1;2;3;4;5;6/2021-4-13;0;1;2;3;4;5;6/2021-4-14;0;1;2;3;4;5;6/2021-4-15;0;1;2;3;4;5;6/2021-4-16"))

// console.log(dbObjToString(dbScheduleToObj("2021-4-10/2021-4-11;0;1;2;3;4;5;6/2021-4-12;0;1;2;3;4;5;6/2021-4-13;0;1;2;3;4;5;6/2021-4-14;0;1;2;3;4;5;6/2021-4-15;0;1;2;3;4;5;6/2021-4-16")))

// if ("2021-4-10/2021-4-11;0;1;2;3;4;5;6/2021-4-12;0;1;2;3;4;5;6/2021-4-13;0;1;2;3;4;5;6/2021-4-14;0;1;2;3;4;5;6/2021-4-15;0;1;2;3;4;5;6/2021-4-16"
//     ===
//     dbObjToString(
//         dbScheduleToObj("2021-4-10/2021-4-11;0;1;2;3;4;5;6/2021-4-12;0;1;2;3;4;5;6/2021-4-13;0;1;2;3;4;5;6/2021-4-14;0;1;2;3;4;5;6/2021-4-15;0;1;2;3;4;5;6/2021-4-16")
//     )) {
//     console.log('its good')
// }

// console.log(dbScheduleToObj("2021-4-10/2021-4-11;0;1;2;3;4;5;6/2021-4-12;0;1;2;3;4;5;6/2021-4-13;0;1;2;3;4;5;6/2021-4-14;0;1;2;3;4;5;6/2021-4-15;0;1;2;3;4;5;6/2021-4-16"))
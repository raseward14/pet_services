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

//pass in all weeks to this as an array to get back a more condensed version of itself
function condenseScheduleObjWeeks(ArrOfScheduleObj) {
    // let objArr = []
    let bigObj = {}
    for (let index = 0; index < ArrOfScheduleObj.length; index++) {
        const scheduleObj = dbScheduleToObj(ArrOfScheduleObj[index]);
        for (const key in scheduleObj) {
            if (Object.hasOwnProperty.call(scheduleObj, key)) {
                const timeSlotArr = scheduleObj[key];
                if (!timeSlotArr) {
                    bigObj[key] = false
                } else {
                    bigObj[key] = timeSlotArr
                }
            }
        }
        // objArr.push(element)
    }
    return bigObj
    // console.log(bigObj)
}

//wants a plain array of employees  
function getNameAndTimeSlotsForDay(date, employees) {
    let returnArr = []
    employees.forEach((employee) => {
        let thing = condenseScheduleObjWeeks([employee.week1, employee.week2, employee.week3, employee.week4])
        let arrOfHourlyTimeslots = [];
        let start = 9;
        let breakTime = 11;
        let timeSlots = thing[date];
        for (let index = 0; index < thing[date].length; index++) {
            const element = thing[date][index];

        }

        let newObj = {
            name: employee.name,
            timeSlots: thing[date],
            empId: employee["id"]
        };
        returnArr.push(newObj)
        // console.log(employee.name)

        // console.log(thing)
        // newObj[employee.name] = thing[date]
    });
    return returnArr
}

function makeTimeslotsIntoTimes(timeslots, start, breakTime) {

}
function makeTimesIntoTimeSlots(timeslots, start, breakTime) {

}


// let thing = condenseScheduleObjWeeks(

// )
// console.log(thing)

const stuff = [
    {
        id: 1,
        name: 'Johnson',
        job: 'dog walker',
        slotHrs: 1,
        shiftStart: 9,
        shiftEnd: 17,
        timeSlots: [],
        totalSlots: 7,
        accountid: 1,
        week1: '2021-3-12;0;1;2;3;4;5;6/2021-3-13;0;1;2;3;4;5;6/2021-3-14;0;1;2;3;4;5;6/2021-3-15;0;1;2;3;4;5;6/2021-3-16/2021-3-17/2021-3-18;0;1;2;3;4;5;6',
        week2: '2021-3-19;0;1;2;3;4;5;6/2021-3-20;0;1;2;3;4;5;6/2021-3-21;0;1;2;3;4;5;6/2021-3-22;0;1;2;3;4;5;6/2021-3-23/2021-3-24/2021-3-25;0;1;2;3;4;5;6',
        week3: '2021-3-26;0;1;2;3;4;5;6/2021-3-27;0;1;2;3;4;5;6/2021-3-28;0;1;2;3;4;5;6/2021-3-29;0;1;2;3;4;5;6/2021-3-30/2021-4-1/2021-4-2;0;1;2;3;4;5;6',
        week4: '2021-4-3;0;1;2;3;4;5;6/2021-4-4;0;1;2;3;4;5;6/2021-4-5;0;1;2;3;4;5;6/2021-4-6;0;1;2;3;4;5;6/2021-4-7/2021-4-8/2021-4-9;0;1;2;3;4;5;6'
    },
    {
        id: 2,
        name: 'Johnny',
        job: 'dog walker',
        slotHrs: 1,
        shiftStart: 9,
        shiftEnd: 17,
        timeSlots: [],
        totalSlots: 7,
        accountid: 2,
        week1: '2021-3-12/2021-3-13/2021-3-14;0;1;2;3;4;5;6/2021-3-15;0;1;2;3;4;5;6/2021-3-16;0;1;2;3;4;5;6/2021-3-17;0;1;2;3;4;5;6/2021-3-18',
        week2: '2021-3-19/2021-3-20/2021-3-21;0;1;2;3;4;5;6/2021-3-22;0;1;2;3;4;5;6/2021-3-23;0;1;2;3;4;5;6/2021-3-24;0;1;2;3;4;5;6/2021-3-25',
        week3: '2021-3-26/2021-3-27/2021-3-28;0;1;2;3;4;5;6/2021-3-29;0;1;2;3;4;5;6/2021-3-30;0;1;2;3;4;5;6/2021-4-1;0;1;2;3;4;5;6/2021-4-2',
        week4: '2021-4-3/2021-4-4/2021-4-5;0;1;2;3;4;5;6/2021-4-6;0;1;2;3;4;5;6/2021-4-7;0;1;2;3;4;5;6/2021-4-8;0;1;2;3;4;5;6/2021-4-9'
    },
    {
        id: 3,
        name: 'Kenneth',
        job: 'dog walker',
        slotHrs: 1,
        shiftStart: 9,
        shiftEnd: 17,
        timeSlots: [],
        totalSlots: 7,
        accountid: 3,
        week1: '2021-3-12/2021-3-13;0;1;2;3;4;5;6/2021-3-14/2021-3-15;0;1;2;3;4;5;6/2021-3-16;0;1;2;3;4;5;6/2021-3-17;0;1;2;3;4;5;6/2021-3-18;0;1;2;3;4;5;6',
        week2: '2021-3-19/2021-3-20;0;1;2;3;4;5;6/2021-3-21/2021-3-22;0;1;2;3;4;5;6/2021-3-23;0;1;2;3;4;5;6/2021-3-24;0;1;2;3;4;5;6/2021-3-25;0;1;2;3;4;5;6',
        week3: '2021-3-26/2021-3-27;0;1;2;3;4;5;6/2021-3-28/2021-3-29;0;1;2;3;4;5;6/2021-3-30;0;1;2;3;4;5;6/2021-4-1;0;1;2;3;4;5;6/2021-4-2;0;1;2;3;4;5;6',
        week4: '2021-4-3/2021-4-4;0;1;2;3;4;5;6/2021-4-5/2021-4-6;0;1;2;3;4;5;6/2021-4-7;0;1;2;3;4;5;6/2021-4-8;0;1;2;3;4;5;6/2021-4-9;0;1;2;3;4;5;6'
    }
]

console.log(getNameAndTimeSlotsForDay("2021-3-14", stuff))
// condenseScheduleObjWeeks(
//     ["2021-4-10/2021-4-11;0;1;2;3;4;5;6/2021-4-12;0;1;2;3;4;5;6/2021-4-13;0;1;2;3;4;5;6/2021-4-14;0;1;2;3;4;5;6/2021-4-15;0;1;2;3;4;5;6/2021-4-16",
//         "2021-4-17/2021-4-18;0;1;2;3;4;5;6/2021-4-19;0;1;2;3;4;5;6/2021-4-20;0;1;2;3;4;5;6/2021-4-21;0;1;2;3;4;5;6/2021-4-22;0;1;2;3;4;5;6/2021-4-23",
//         "2021-4-24/2021-4-25;0;1;2;3;4;5;6/2021-4-26;0;1;2;3;4;5;6/2021-4-27;0;1;2;3;4;5;6/2021-4-28;0;1;2;3;4;5;6/2021-4-29;0;1;2;3;4;5;6/2021-4-30",
//         "2021-5-1/2021-5-2;0;1;2;3;4;5;6/2021-5-3;0;1;2;3;4;5;6/2021-5-4;0;1;2;3;4;5;6/2021-5-5;0;1;2;3;4;5;6/2021-5-6;0;1;2;3;4;5;6/2021-5-7"])



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
module.exports = {
    dbScheduleToObj: dbScheduleToObj,
    dbObjToString: dbObjToString,
    scheduleAppt: scheduleAppt
};
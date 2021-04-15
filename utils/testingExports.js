const helper = require('./jsHelp.js');
let testingStuff = [
    {
        "id": 1,
        "accountId": 1,
        "employeeId": 1,
        "date": "2021-3-14",
        "milTimeSlots": "9,10,12,13,14,15,16"
    },
    {
        "id": 2,
        "accountId": 1,
        "employeeId": 1,
        "date": "2021-3-15",
        "milTimeSlots": "9,10,12,13,14,15,16"
    },
    {
        "id": 3,
        "accountId": 1,
        "employeeId": 1,
        "date": "2021-3-16",
        "milTimeSlots": "9,10,12,13,14,15,16"
    },
    {
        "id": 4,
        "accountId": 1,
        "employeeId": 1,
        "date": "2021-3-17",
        "milTimeSlots": null
    }
]

console.log(helper.simplifyTimeSlots(testingStuff))

// console.log(helper.dbObjToString(helper.dbScheduleToObj("2021-4-10/2021-4-11;0;1;2;3;4;5;6/2021-4-12;0;1;2;3;4;5;6/2021-4-13;0;1;2;3;4;5;6/2021-4-14;0;1;2;3;4;5;6/2021-4-15;0;1;2;3;4;5;6/2021-4-16")))
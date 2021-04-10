//pass in a single week, get an easy to use object out
//Empty days should probably be included to make searching simpler, huh.
//Yeah, that makes sense.
function dbScheduleToObj(dbThing) {
    let arrOfDays = dbThing.split("/")
    let dayArr = []
    let returnObj = {}
    for (let index = 0; index < arrOfDays.length; index++) {
        const element = arrOfDays[index].split(";");
        if (element.length == 1) {
            returnObj[element[0]] = false
        } else {
            returnObj[element[0]] = false
        }

    }
}
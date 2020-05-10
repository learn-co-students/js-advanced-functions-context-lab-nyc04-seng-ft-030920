/* Your Code Here */

let createEmployeeRecord = (row) => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (aOfAs) => {return aOfAs.map(row => createEmployeeRecord(row))}

let createTimeInEvent = function(dateString) {
    let [date, hour] = dateString.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    })
    return this
}

let createTimeOutEvent = function(dateString) {
    let [date, hour] = dateString.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let hourIn = this.timeInEvents.find(event => event["date"] === date).hour/100
    let hourOut = this.timeOutEvents.find(event => event["date"] === date).hour/100
    return hourOut - hourIn
}

let wagesEarnedOnDate = function(date) {return hoursWorkedOnDate.call(this, date) * this.payPerHour}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(rec => {return rec.firstName === firstName})
}

let calculatePayroll = (arrayOfRecs) => {return arrayOfRecs.reduce((a, rec) => a + allWagesFor.call(rec), 0)}


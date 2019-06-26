const moment = require('moment');

var oldServiceData;

let TimeServiceData = { id: '', duration: 0, timeInit: 0 };

var initServiceData = function() {
    var date;
    date = moment();
    oldServiceData = date;
    console.log('App started: ' + date.format('YYYY-MM-DD hh:mm:ss'));
    return date;
}

var getTime = function() {
    var date;
    date = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log('Time now: ' + date);
    return date;
}

var getTimeServiceData = function() {

    var now = moment();

    // console.log(moment.duration(oldServiceData - now).humanize());
    // console.log(now.diff(oldServiceData, 'seconds'));

    TimeServiceData.id = 'RestServer-test';
    TimeServiceData.duration = moment.duration(oldServiceData - now).humanize();
    TimeServiceData.timeInit = oldServiceData.format('YYYY-MM-DD hh:mm:ss');

    console.log(TimeServiceData);
    return TimeServiceData;
}


module.exports = {
    initServiceData,
    getTime,
    getTimeServiceData
}
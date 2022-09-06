import Event from './event.js';

var event = Event;

var startDate = '2016-07-01 10:30'; // July 1st, 10:30
var endDate = '2016-07-01 14:00'; // July 1st, 14:00
// weekly recurring opening in calendar
event.create(true, true, startDate, endDate);

startDate = '2016-07-08 11:30'; // July 8th 11:30
endDate = '2016-07-08 12:30'; // July 8th 12:30
// intervention scheduled
event.book(startDate, endDate);

var fromDate = '2016-07-04 10:00';
var toDate = '2016-07-10 10:00';
const availabilities = event.getAvailabilities(fromDate, toDate);

availabilities.forEach((availability) => {
    console.log(`I\'m available on ${availability.start}`);
});
    console.log('I\'m not available any other time !');
/*
 * Answer should be :
 * I'm available from July 8th, at 10:30, 11:00, 12:30, 13:00, and 13:30
 * I'm not available any other time !
 */

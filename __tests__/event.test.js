import Event from '../event.js';

describe('Test Event class', () => {
    var event = Event;

    it('Event should be a class object', () => {
        expect(event).toBeInstanceOf(Object);
        expect(event.eventList).toEqual([]);
    });

    it('Event.create() should be able to create an array of dates', () => {
        var startDate = '2016-07-01 10:30'; // July 1st, 10:30
        var endDate = '2016-07-01 14:00'; // July 1st, 14:00
        event.create(true, true, startDate, endDate);

        expect(event.eventList).toBeInstanceOf(Array);
        expect(event.eventList.length).toEqual(35);
    });

    it('Event.book() should turn off some slots', () => {
        var startDate = '2016-07-08 11:30'; // July 8th 11:30
        var endDate = '2016-07-08 12:30'; // July 8th 12:30
        event.book(startDate, endDate);
        expect(event.eventList[9].opening).toEqual(false);
        expect(event.eventList[10].opening).toEqual(false);
    });

    it('Event.getAvailabilities() should return an array of availables slots', () => {
        var fromDate = '2016-07-04 10:00';
        var toDate = '2016-07-10 10:00';
        const availabilities = event.getAvailabilities(fromDate, toDate);

        expect(availabilities).toBeInstanceOf(Array);
        expect(availabilities.length).toEqual(5);
    });
});

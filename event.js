import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(isBetween);

/**
 * class which allows to create a calendar of available slots,
 * to book dates and to obtain the available slots
 */
class _Event {
    constructor() {
        this.eventList = [];
        // slots intervals in minutes
        this.slotsInterval = 30;
    }

    /**
     * Create the company calendar
     * @param opening
     * @param recurring
     * @param startDate
     * @param endDate
     */
    create(opening, recurring, startDate, endDate) {
        if (recurring) {
            const date = new Date(dayjs(startDate).toDate().getTime());
            const day = dayjs(startDate).day();

            const dates = [];
            /**
             * For the purposes of the test we only calculate the dates over one
             * month. Ideally, the end date of the recursion should be "real"
             */
            while (date <= dayjs(endDate).add(1, 'month').toDate()) {

                const endHourDate = `${dayjs(date).format('YYYY-MM-DD')} ${dayjs(endDate).format('HH:mm')}`;
                const endHour = dayjs(endHourDate).valueOf();

                if(dayjs(date).day() === day) {
                    let startHour = dayjs(date).valueOf();
                    /**
                     * Loop on time slots to create one event for each
                     */
                    while (startHour < endHour) {
                        // get start formated as a date
                        const formatedStartHour = dayjs(startHour).format('HH:mm');
                        const startDate = `${dayjs(date).format('YYYY-MM-DD')} ${formatedStartHour}`;
                        const start = dayjs(startDate).format('YYYY-MM-DD HH:mm');

                        // get end formated as a date
                        const formatedEndHour = dayjs(startHour + (this.slotsInterval * 60000)).format('HH:mm');
                        const endDate = `${dayjs(date).format('YYYY-MM-DD')} ${formatedEndHour}`;
                        const end = dayjs(endDate).format('YYYY-MM-DD HH:mm');

                        // push a new slot in the event list
                        this.eventList.push({
                            opening,
                            recurring: false,
                            start,
                            end
                        });

                        // add the slot interval to iterate on the next interval (60000ms is 1min)
                        startHour = startHour + (this.slotsInterval * 60000);
                    }
                }
                // add 1 day to the date to itterate on the next date
                date.setDate(dayjs(date).get('date') + 1);
            }
        } else {
            this.eventList.push({ opening, recurring, startDate, endDate});
        }
    }

    /**
     * Book a date in the company calendar
     * @param startDate
     * @param endDate
     */
    book(startDate, endDate) {
        const opened = this.eventList.filter(({ opening }) => opening);
        opened.forEach(({ start }, index) => {
            if (dayjs(start).isBetween(dayjs(startDate), dayjs(endDate))
                || dayjs(start).isSame(dayjs(startDate))) {
                this.eventList[index].opening = false;
            }
        });
    }

    /**
     * get availables dates in the calendar
     * @param fromDate - string
     * @param toDate - string
     * @returns {*[]} - array
     */
    getAvailabilities(fromDate, toDate) {
        // get opened slots
        const opened = this.eventList.filter(({ opening }) => opening);
        // filter depending on the wanted dates / hours
        return opened
            .filter(({ start }) => {
                return dayjs(start).isBetween(dayjs(fromDate), dayjs(toDate))
                    || dayjs(start).isSame(dayjs(fromDate))
                    || dayjs(start).isSame(dayjs(toDate));
            });
    }
}

const Event = new _Event();
export default Event;

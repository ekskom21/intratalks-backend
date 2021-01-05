import { isPast, subHours, fromUnixTime, addHours, isFuture, subMinutes } from 'date-fns';
import { EventTime } from '../generated/graphql';

// Tech Talks time, if we are not in devlopment we set the date to February 18th 2021 at 10 o'clock
export const BASE_TIME = process.env.NODE_ENV === 'development' ? subHours(new Date(), 4) : fromUnixTime(1613642400);

// Set the registration deadline to February 17th 2021 at 10 o'clock
const registationDeadline = new Date(2021, 1, 17, 10);

export const checkTime = (): void => {
    if (isPast(registationDeadline) && process.env.NODE_ENV !== 'development') {
        throw Error('The deadline for registering interest was due 24 hours before Tech Talks.');
    }
};

export const translateTime = (time: EventTime): Date => {
    return {
        [EventTime.Breakfast]: BASE_TIME,
        [EventTime.Lunch]: addHours(BASE_TIME, 4),
        [EventTime.Dinner]: addHours(BASE_TIME, 9),
    }[time];
};

export const registerInTime = (eventTime: EventTime): void => {
    if (isFuture(subMinutes(translateTime(eventTime), 15))) {
        throw new Error('Registration has not opened yet');
    }
};

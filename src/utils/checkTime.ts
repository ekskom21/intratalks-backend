import { isWithinInterval } from 'date-fns';

// Set Tech Talks date to February 18th 2021 at 10 o'clock
const techTalksStart = new Date(2021, 1, 18, 10);

// Set the registration deadline to February 17th 2021 at 10 o'clock
const registationDeadline = new Date(2021, 1, 17, 10);

export default (): void => {
    const now = new Date();

    if (
        !isWithinInterval(now, { start: registationDeadline, end: techTalksStart }) &&
        process.env.NODE_ENV !== 'development'
    ) {
        throw Error('The deadline for registering interest was due 24 hours before Tech Talks.');
    }
};

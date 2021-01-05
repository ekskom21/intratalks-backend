import { isPast } from 'date-fns';

// Set the registration deadline to February 17th 2021 at 10 o'clock
const registationDeadline = new Date(2021, 1, 17, 10);

export default (): void => {
    if (isPast(registationDeadline) && process.env.NODE_ENV !== 'development') {
        throw Error('The deadline for registering interest was due 24 hours before Tech Talks.');
    }
};

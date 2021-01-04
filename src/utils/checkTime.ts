// Set Tech Talks date to February 18th 2021 at 10 o'clock
const techTalks = new Date(2021, 1, 18, 10);
const MILLISECONDS_IN_TWENTY_FOUR_HOURS = 1000 * 60 * 24;

export default (): void => {
    const now = new Date();
    const timeDiff = techTalks.getTime() - now.getTime();

    if (timeDiff < MILLISECONDS_IN_TWENTY_FOUR_HOURS) {
        throw Error('The deadline for registering interest was due 24 hours before Tech Talks.');
    }
};

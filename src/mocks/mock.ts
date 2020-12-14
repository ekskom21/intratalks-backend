/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import casual from 'casual';
const gradientColors = ['red-400', 'red-500', 'purple-400', 'purple-500', 'yellow-400', 'yellow-500'];

export default {
    ColorSet: () => ({
        primary: (): string => casual.random_element(gradientColors),
        secondary: (): string => casual.random_element(gradientColors),
    }),
    Location: () => ({
        lat: () => casual.latitude,
        long: () => casual.longitude,
        name: () => casual.street,
    }),
    Event: () => ({
        title: () => casual.title,
        description: () => casual.sentences(2),
    }),
    Company: () => ({
        name: () => casual.company_name,
        description: () => casual.sentences(4),
    }),
};

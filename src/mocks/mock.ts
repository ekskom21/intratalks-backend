/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MockList } from 'apollo-server';
import casual from 'casual';
import crypto from 'crypto';
const gradientColors = ['red-400', 'red-500', 'purple-400', 'purple-500', 'yellow-400', 'yellow-500'];
const randomIDToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVrc29tIiwiaXNzIjoiaHR0cHM6Ly9zLm50bnUubm8vYWJha3VzIn0.ZGGKoEtr23GK83OHoVMI7RjWE41a3dhQUUXoAKMQuYo';

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
        events: () => new MockList([1, 3]),
    }),
    Tokens: () => ({
        access_token: () => crypto.createHash('md5').update(casual.random.toString()).digest('hex'),
        id_token: () => randomIDToken,
        refresh_token: () => crypto.createHash('md5').update(casual.random.toString()).digest('hex'),
        expires_in: 3600,
    }),
    Query: () => ({
        companies: () => new MockList([7, 9]),
        events: () => new MockList(25),
        assignedEvents: () => ({
            user_id: () => casual.integer(10000, 25000),
        }),
    }),
};

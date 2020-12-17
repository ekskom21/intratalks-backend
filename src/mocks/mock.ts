/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import casual from 'casual';
import crypto from 'crypto';
const gradientColors = ['red-400', 'red-500', 'purple-400', 'purple-500', 'yellow-400', 'yellow-500'];
const randomIDToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk0OWQyZWE0NDZlYjFlMmEzYzhiMmU4YmMyY2E2Yzg5In0.eyJpc3MiOiJodHRwczovL29ubGluZS5udG51Lm5vL29wZW5pZCIsInN1YiI6IjE0MDMiLCJhdWQiOiI2OTczNTUiLCJleHAiOjE2MDgyMzIzMjksImlhdCI6MTYwODIzMTcyOSwiYXV0aF90aW1lIjoxNjA3ODA0NjIwLCJhdF9oYXNoIjoianZoMHU5YkJUR0JNNjRnalE5cFp6USJ9.VIdAK58FEAe3HZMtcADPd1j3QY9cPBLph4uB2Q0v5sswIkVvSntH0QwN-lb-CwBFB4NkkrRQa0sI-vzMLdOC_UqfGorUnZY8zCw6LzhTJ1kDbLsimYsErNROBdqLXEX-HU1AR6EyVt4D0wiKBLhp6fiaotsxlPGQO-x87h6GK24';

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
    Tokens: () => ({
        access_token: () => crypto.createHash('md5').update(casual.random.toString()).digest('hex'),
        id_token: () => randomIDToken,
        refresh_token: () => crypto.createHash('md5').update(casual.random.toString()).digest('hex'),
        expires_in: 3600,
    }),
};

const CONNECTION_URL = process.env.MONGODB_URL;
const SHOULD_MOCK = process.env.SHOULD_MOCK !== 'false';

const defaultPort = 4000;

interface Environment {
    apollo: {
        introspection: boolean;
        playground: boolean;
        mockEntireSchema: boolean;
    };
    mongoDb: {
        databaseName: string;
        url: string;
    };
    port: number | string;
}

export const environment: Environment = {
    apollo: {
        playground: process.env.NODE_ENV === 'development',
        introspection: process.env.NODE_ENV === 'development',
        mockEntireSchema: process.env.NODE_ENV === 'development' && SHOULD_MOCK,
    },
    mongoDb: {
        databaseName: 'techtalks',
        url: CONNECTION_URL || '',
    },
    port: process.env.PORT || defaultPort,
};

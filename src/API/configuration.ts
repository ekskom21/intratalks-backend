const CONNECTION_URL = `mongodb+srv://admin:hemmelig@cluster0.xbqon.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;

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
        mockEntireSchema: process.env.NODE_ENV === 'development',
    },
    mongoDb: {
        databaseName: 'sample_airbnb',
        url: CONNECTION_URL,
    },
    port: process.env.PORT || defaultPort,
};

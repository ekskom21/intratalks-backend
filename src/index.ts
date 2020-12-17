import { ApolloServer } from 'apollo-server';

import { DateTimeMock, DateTimeResolver } from 'graphql-scalars';
import { environment } from './API/configuration';

import mocks from './mocks/mock';

import queryResolver from './resolvers/Query';
import mutationResolver from './resolvers/Mutation';

import * as scalarTypeDef from './typedefs/Scalars.graphql';
import * as queryTypeDef from './typedefs/Query.graphql';
import * as mutationTypeDef from './typedefs/Mutation.graphql';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    const server = new ApolloServer({
        resolvers: { ...queryResolver, ...mutationResolver, DateTime: DateTimeResolver },
        typeDefs: [scalarTypeDef, queryTypeDef, mutationTypeDef],
        playground: environment.apollo.playground,
        // Allows codegen to get the query/schema types from the server instead of parsing static files.
        introspection: environment.apollo.introspection,
        mockEntireSchema: environment.apollo.mockEntireSchema,
        mocks: {
            DateTime: DateTimeMock,
            ...mocks,
        },
    });

    server.listen(environment.port).then(({ url }) => console.log(`[Apollo Server] Ready at ${url}.`));

    // Hot Module Replacement
    if (module.hot) {
        module.hot.accept();

        module.hot.dispose(() => {
            console.log('[HMR] Module disposed.');
            server.stop();
        });
    }
})();

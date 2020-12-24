import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server';

import configureDb from './API/db';

import { DateTimeMock, DateTimeResolver } from 'graphql-scalars';
import { environment } from './API/configuration';

import mocks from './mocks/mock';

import queryResolver from './resolvers/Query';
import mutationResolver from './resolvers/Mutation';

import * as scalarTypeDef from './typedefs/Scalars.graphql';
import * as queryTypeDef from './typedefs/Query.graphql';
import * as mutationTypeDef from './typedefs/Mutation.graphql';
import mongoose from 'mongoose';

(async () => {
    // Only spin up MongoDB connection if we aren't mocking and it's disconnected.
    if (process.env.MOCK === 'false' && mongoose.connection.readyState === 0) {
        await configureDb();
    }

    const server = new ApolloServer({
        resolvers: { ...queryResolver, ...mutationResolver, DateTime: DateTimeResolver },
        typeDefs: [scalarTypeDef, queryTypeDef, mutationTypeDef],
        playground: environment.apollo.playground,
        context: mongoose.connection,
        // Allows codegen to get the query/schema types from the server instead of parsing static files.
        introspection: environment.apollo.introspection,
        mockEntireSchema: environment.apollo.mockEntireSchema,
        // If we don't want to mock, don't mock.
        mocks: environment.apollo.mockEntireSchema
            ? {
                  DateTime: DateTimeMock,
                  ...mocks,
              }
            : false,
    });

    console.log('[Apollo Server] Starting server...');

    server.listen(environment.port).then(({ url }) => console.log(`[Apollo Server] Ready at ${url}.`));

    // Hot Module Replacement
    if (module.hot) {
        module.hot.accept();

        module.hot.dispose(async () => {
            console.log('[HMR] Module disposed.');
            server.stop();
        });
    }
})();

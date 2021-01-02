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

import mongoose, { Document, Model } from 'mongoose';
import { Company } from './mongoose/models';

export type ResolverContext = {
    models: Record<'Company', Model<Document>>;
    user?: { access_token: string };
};

(async () => {
    // Only spin up MongoDB connection if we aren't mocking and it's disconnected.
    if (process.env.MOCK === 'false' && mongoose.connection.readyState === 0) {
        await configureDb();
    }

    const server = new ApolloServer({
        resolvers: { ...queryResolver, ...mutationResolver, DateTime: DateTimeResolver },
        typeDefs: [scalarTypeDef, queryTypeDef, mutationTypeDef],
        playground: environment.apollo.playground,
        context: ({ req }): ResolverContext => {
            const access_token = req.headers.authorization;

            let user: ResolverContext['user'] = undefined;

            // Check that there are two parts of the header -- "Bearer" + token
            if (access_token && access_token.split(' ').length === 2) {
                user = { access_token: access_token.split(' ')[1] };
            }

            return {
                models: {
                    Company,
                },
                user,
            };
        },
        // Allows codegen to get the query/schema types from the server instead of parsing static files.
        introspection: environment.apollo.introspection,
        mockEntireSchema: environment.apollo.mockEntireSchema,
        // If we don't want to mock, don't mock.
        mocks: environment.apollo.mockEntireSchema && {
            DateTime: DateTimeMock,
            ...mocks,
        },
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

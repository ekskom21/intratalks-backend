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
import { Company, Event, Interest, Assigned } from './mongoose/models';

import { verify } from 'jsonwebtoken';
import { Claims } from './utils/jwtClaims';

export type ResolverContext = {
    models: Record<'Company' | 'Event' | 'Interest' | 'Assigned', Model<Document>>;
    user?: { access_token: string; claims: Claims };
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
            // access token to OW
            const access_token = req.headers.authorization;
            // identity token for local authentication
            const id_token = req.headers['x-user-id'] as string;

            let user: ResolverContext['user'] = undefined;

            // Check that there are two parts of the header -- "Bearer" + token
            if (access_token && access_token.split(' ').length === 2 && id_token) {
                try {
                    // We force unwrap as we _want_ the server to crash if the developer didn't include the public key
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const claims = verify(id_token, process.env.PUBLIC_KEY!) as Claims;

                    user = { access_token: access_token.split(' ')[1], claims };
                } catch (e) {
                    console.log('Invalid token supplied.');
                }
            }

            return {
                models: {
                    Company,
                    Event,
                    Interest,
                    Assigned,
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

import { QueryCompanyArgs, QueryEventArgs, RegistrationState } from '../generated/graphql';
import { Document } from 'mongoose';
import { ResolverContext } from '..';
import userRegistered from '../utils/userRegistered';
import guardAuthenticated from '../utils/guardAuthenticated';

export default {
    Query: {
        companies: async (_parent: unknown, _args: undefined, context: ResolverContext): Promise<Array<Document>> => {
            return await context.models.Company.find({}).populate('events').exec();
        },

        company: async (_: unknown, { _id }: QueryCompanyArgs, context: ResolverContext): Promise<Document | null> => {
            return await context.models.Company.findById(_id).populate('events').exec();
        },

        event: async (_: unknown, { _id }: QueryEventArgs, context: ResolverContext): Promise<Document | null> => {
            const event = await context.models.Event.findById(_id).populate('company').exec();

            return event;
        },

        userRegistered: async (_: unknown, _args: undefined, context: ResolverContext): Promise<RegistrationState> => {
            guardAuthenticated(context);

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return userRegistered(context.user!.access_token);
        },

        desiredEvents: async (_: unknown, _args: undefined, context: ResolverContext): Promise<Document | null> => {
            guardAuthenticated(context);

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return await context.models.Interest.findOne({ user_id: context.user!.claims.sub }).populate([
                { path: 'breakfast', populate: { path: 'company' } },
                { path: 'lunch', populate: { path: 'company' } },
                { path: 'dinner', populate: { path: 'company' } },
            ]);
        },

        assignedEvents: async (_: unknown, _args: undefined, context: ResolverContext): Promise<Document | null> => {
            guardAuthenticated(context);

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return await context.models.Assigned.findOne({ user_id: context.user!.claims.sub }).populate([
                { path: 'breakfast', populate: { path: 'company' } },
                { path: 'lunch', populate: { path: 'company' } },
                { path: 'dinner', populate: { path: 'company' } },
            ]);
        },
    },
};

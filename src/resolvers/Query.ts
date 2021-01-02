import { QueryCompanyArgs, QueryEventArgs, RegistrationState } from '../generated/graphql';
import { Document } from 'mongoose';
import { ResolverContext } from '..';
import userRegistered from '../utils/userRegistered';

export default {
    Query: {
        companies: async (_parent: unknown, _args: undefined, context: ResolverContext): Promise<Array<Document>> => {
            return await context.models.Company.find({});
        },

        company: async (_: unknown, { _id }: QueryCompanyArgs, context: ResolverContext): Promise<Document | null> => {
            return await context.models.Company.findById(_id);
        },

        event: async (
            _: unknown,
            { _id }: QueryEventArgs,
            context: ResolverContext,
        ): Promise<{ event: Document; company: Document } | null> => {
            const company = await context.models.Company.findOne({ events: { $elemMatch: { _id } } });

            if (company === null) {
                return null;
            }

            const events: Array<Document<string>> = company.get('events');

            return {
                company: company,
                // Safe to force-unwrap here since we have already queried for the ID.
                // We also want "==" and not "===" to allow JS to perform coercion between string and ObjectId from mongodb driver.
                // 'tis a strange world we live in
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                event: events.find((e) => e._id! == _id)!,
            };
        },

        userRegistered: async (_: unknown, _args: undefined, context: ResolverContext): Promise<RegistrationState> => {
            return userRegistered(context.user.access_token);
        },
    },
};

import { QueryCompanyArgs, QueryEventArgs } from '../generated/graphql';
import { Company } from '../mongoose/models';
import { Document } from 'mongoose';

export default {
    Query: {
        companies: async (): Promise<Array<Document>> => {
            return await Company.find({});
        },
        company: async (_: unknown, { _id }: QueryCompanyArgs): Promise<Document | null> => {
            return await Company.findById(_id);
        },
        event: async (_: unknown, { _id }: QueryEventArgs): Promise<{ event: Document; company: Document } | null> => {
            const company = await Company.findOne({ events: { $elemMatch: { _id } } });

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
    },
};

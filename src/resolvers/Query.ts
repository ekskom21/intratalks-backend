import { Company as CompanyT, QueryCompanyArgs } from '../generated/graphql';
import { Company } from '../mongoose/models';
import { Document } from 'mongoose';

export default {
    Query: {
        companies: async (): Promise<Array<Document<CompanyT>>> => {
            return await Company.find({});
        },
        company: async (_: unknown, { _id }: QueryCompanyArgs): Promise<Document<CompanyT> | null> => {
            return await Company.findById(_id);
        },
    },
};

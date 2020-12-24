import { Company as CompanyT } from '../generated/graphql';
import { Company } from '../mongoose/models';
import { Document } from 'mongoose';

export default {
    Query: {
        companies: async (): Promise<Array<Document<CompanyT>>> => {
            return await Company.find({});
        },
    },
};

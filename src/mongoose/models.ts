import mongoose, { Document } from 'mongoose';
import { companySchema } from './schemas';
import { Company as CompanyT } from '../generated/graphql';

export const Company = mongoose.model<Document<CompanyT>>('Company', companySchema);

import mongoose, { Document } from 'mongoose';
import { companySchema } from './schemas';

export const Company = mongoose.model<Document>('Company', companySchema);

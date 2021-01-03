import mongoose, { Document } from 'mongoose';
import { companySchema, eventSchema, eventDaySchema } from './schemas';

export const Event = mongoose.model<Document>('Event', eventSchema);
export const Company = mongoose.model<Document>('Company', companySchema);
export const Interest = mongoose.model<Document>('Interest', eventDaySchema);
export const Assigned = mongoose.model<Document>('Assigned', eventDaySchema);

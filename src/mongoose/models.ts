import mongoose from 'mongoose';
import { ColorSetSchema, CompanySchema, EventAndCompanySchema, EventSchema, LocationSchema } from './schemas';

export const Location = mongoose.model('Location', LocationSchema);
export const Event = mongoose.model('Event', EventSchema);
export const ColorSet = mongoose.model('ColorSet', ColorSetSchema);
export const Company = mongoose.model('Company', CompanySchema);
export const EventAndCompany = mongoose.model('EventAndCompany', EventAndCompanySchema);

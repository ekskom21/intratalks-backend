import mongoose, { Document } from 'mongoose';
import { locationSchema } from './schemas';
import { Location as LocationT } from '../generated/graphql';

export const Location = mongoose.model<Document<LocationT>>('Location', locationSchema);

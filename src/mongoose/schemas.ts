import mongoose, { Schema } from 'mongoose';
import {
    ColorSet,
    Company,
    Event as EventT,
    EventTime,
    Location as LocationT,
    UserInterest,
} from '../generated/graphql';

export const locationSchema: Schema<LocationT> = new mongoose.Schema({
    lat: Number,
    lng: Number,
    name: String,
});

export const eventSchema: Schema<EventT> = new mongoose.Schema({
    title: String,
    time: { type: String, enum: ['BREAKFAST', 'LUNCH', 'DINNER'] as EventTime[] },
    location: locationSchema,
    description: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

export const colorSetSchema: Schema<ColorSet> = new mongoose.Schema({
    primary: String,
    secondary: String,
});

export const companySchema: Schema<Company> = new mongoose.Schema({
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    name: String,
    colors: colorSetSchema,
    description: String,
});

export const interestSchema: Schema<UserInterest> = new mongoose.Schema({
    user_id: { type: String, index: true },
    breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

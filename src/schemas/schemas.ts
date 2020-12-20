import mongoose, { Schema } from 'mongoose';
import { ColorSet, Company, Event, EventAndCompany, EventTime, Location as LocationType } from '../generated/graphql';

export const LocationSchema: Schema<LocationType> = new mongoose.Schema({
    lat: Float32Array,
    lng: Float32Array,
    name: String,
});

export const EventSchema: Schema<Event> = new mongoose.Schema({
    title: String,
    time: EventTime,
    location: LocationSchema,
    description: String,
});

export const ColorSetSchema: Schema<ColorSet> = new mongoose.Schema({
    primary: String,
    secondary: String,
});

export const CompanySchema: Schema<Company> = new mongoose.Schema({
    events: [EventSchema],
    name: String,
    colors: ColorSetSchema,
    description: String,
});

export const EventAndCompanySchema: Schema<EventAndCompany> = new mongoose.Schema({
    event: EventSchema,
    company: CompanySchema,
});

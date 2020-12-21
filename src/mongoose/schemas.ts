import { Decimal128 } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { ColorSet, Company, Event, EventAndCompany, EventTime, Location as LocationType } from '../generated/graphql';

export const LocationSchema: Schema<LocationType> = new mongoose.Schema({
    lat: Decimal128,
    lng: Decimal128,
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

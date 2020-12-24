import { Decimal128 } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { ColorSet, Company, Event as EventT, EventTime, Location as LocationT } from '../generated/graphql';

export const locationSchema: Schema<LocationT> = new mongoose.Schema({
    lat: Number,
    lng: Number,
    name: String,
});

export const eventSchema: Schema<EventT> = new mongoose.Schema({
    title: String,
    time: EventTime,
    location: locationSchema,
    description: String,
});

export const colorSetSchema: Schema<ColorSet> = new mongoose.Schema({
    primary: String,
    secondary: String,
});

export const companySchema: Schema<Company> = new mongoose.Schema({
    events: { type: [eventSchema], index: true },
    name: String,
    colors: colorSetSchema,
    description: String,
});

import mongoose from 'mongoose';
import { environment } from './configuration';

// Refer to overview of connection events:
// https://mongoosejs.com/docs/connections.html#connection-events

export default async (): Promise<void> => {
    try {
        mongoose.connection.on('connecting', () => console.log('[Mongoose] Establishing connection to MongoDB...'));
        mongoose.connection.on('open', () => console.log('[Mongoose] Connection complete.'));
        mongoose.connection.on('error', (e) => console.error(`[Mongoose] Error occurred on connection: ${e}`));
        mongoose.connection.on('disconnecting', () => console.log('[Mongoose] Explicitly requested Connection#close.'));
        mongoose.connection.on('disconnected', () => console.log('[Mongoose] Lost connection to MongoDB server.'));

        await mongoose.connect(environment.mongoDb.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (e) {
        console.error(`[Mongoose] Error while connecting: ${e}`);
        throw e;
    }
};

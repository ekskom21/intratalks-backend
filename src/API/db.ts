import mongoose, { Connection } from 'mongoose';
import { environment } from './configuration';

// Refer to overview of connection events:
// https://mongoosejs.com/docs/connections.html#connection-events

export default async (): Promise<Connection> => {
    try {
        const { connection } = await mongoose.connect(environment.mongoDb.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('[Mongoose] Connection complete.');

        connection.on('error', (e) => console.error(`[Mongoose] Error occurred on connection: ${e}`));

        connection.on('disconnecting', () => console.log('[Mongoose] Explicitly requested Connection#close.'));

        connection.on('disconnected', () => console.log('[Mongoose] Lost connection to MongoDB server.'));

        return connection;
    } catch (e) {
        console.error(`[Mongoose] Error while connecting: ${e}`);
        throw e;
    }
};

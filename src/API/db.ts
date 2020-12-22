import mongoose from 'mongoose';
import { environment } from './configuration';

mongoose.connect(environment.mongoDb.url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => {
    console.error('connection error:');
});
db.once('disconnecting', () => {
    console.log('[MongoDB] Disconnecting!');
});
db.once('open', () => {
    console.log('[MongoDB] Connected!');
});

export default db;

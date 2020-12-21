import mongoose from 'mongoose';
import { environment } from './configuration';

mongoose.connect(environment.mongoDb.url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('[MongoDB] Connected!');
});

export default db;

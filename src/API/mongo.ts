import { Collection, Db, MongoClient } from 'mongodb';
import { environment } from './configuration';

export enum DbCollection {}

class MongoDBProvider {
    private database?: Db;
    private client?: MongoClient;

    constructor(url: string) {
        this.client = new MongoClient(url, {
            useUnifiedTopology: true,
        });
        this.connect();
    }

    async connect(dbName = environment.mongoDb.databaseName) {
        try {
            await this.client?.connect();
            this.database = this.client?.db(dbName);
            console.log('[MongoDB] Connected!');
        } catch (err) {
            console.warn(`Could not connect to Mongo db: ${err}`);
        }
    }

    async close() {
        await this.client?.close();
        this.database = undefined;
    }

    getCollection(collection: DbCollection): Collection | undefined {
        if (this.database === undefined) throw Error('No database instantiated.');

        return this.database.collection(''); //collection);
    }
}

export default new MongoDBProvider(environment.mongoDb.url);

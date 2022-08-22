import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/*
 * Class for mongo service operations.
 */
class DBClient {
    constructor() {
        MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
            if (!err) {
                console.log('connected successfully to the server');
                this.db = client.db(DB_DATABASE);
                this.usersCollection = this.db.collection('users');
                this.filesCollection = this.db.collection('files');
            } else {
                console.log(err.message);
                this.db = false;
            }
        });
    }

    /*
     * returns true when the connection to MongoDB is a success
     * otherwise, false
     */
    isAlive() {
        return Boolean(this.db);
    }

    /*
     * returns the number of documents in the collection users
     */
    async nbUsers() {
        const numberOfUsers = this.usersCollection.countDocuments();
        return numberOfUsers;
    }

    /*
     * returns the number of documents in the collection files
     */
    async nbFiles() {
        const numberOfFiles = this.filesCollection.countDocuments();
        return numberOfFiles;
    }
}

const dbClient = new DBClient();

export default dbClient;

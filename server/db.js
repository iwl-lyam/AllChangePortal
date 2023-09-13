import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'

const client = new MongoClient(process.env.MONGO, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/**
 * MongoDB Connection class.
 * @constructor
 */
export default class Mongo {
    async constructor() {
        try {
            await client.connect()
            await client.db("ac").command({ping: 1});
            console.log("MongoDB connection active")
        } catch(err) {
            console.log("MongoDB connection FAILURE:")
            console.log(err)
            process.exit(1)
        }
    }

    /**
     * Get documents from a certain collection
     * @param {string} col - Target collection
     * @param {Object} filter - Only get documents that match this filter
     * @returns {Array} - Result of the GET request
     */
    async get(col,filter) {
        try {
            await client.collection(col)
            let res = await client.find(filter)
            return await res.toArray()
        } catch(err) {
            console.log("MongoDB GET FAILURE:")
            console.log(err)
            process.exit(1)
        }
    }

    /**
     * Post documents to a certain collection
     * @param {string} col - Target collection
     * @param {Array} data - Array of documents as objects
     */
    async post(col,data) {
        try {
            await client.collection(col)
            await client.insertMany(data)
        } catch(err) {
            console.log("MongoDB POST FAILURE:")
            console.log(err)
            process.exit(1)
        }
    }
}
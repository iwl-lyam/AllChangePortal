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
    constructor() {
        const f = async () => {
            try {
                await client.connect()
                this.c = await client.db("portal")
                await this.c.command({ping: 1})
                console.log("MongoDB connection active")
            } catch (err) {
                console.log("MongoDB connection FAILURE:")
                console.log(err)
                process.exit(1)
            }
        }
        f().then(r => {})
    }

    /**
     * Get documents from a certain collection
     * @param {string} col - Target collection
     * @param {Object} filter - Only get documents that match this filter
     * @returns {Promise} - Results of the GET Request
     */
    get(col,filter) {
        return new Promise(async (res, rej) => {
            try {
                const collection = await this.c.collection(col)
                res(await collection.find(filter).toArray())
            } catch (err) {
                console.log("MongoDB GET FAILURE:")
                rej(err)
            }
        })

    }

    /**
     * Post documents to a certain collection
     * @param {string} col - Target collection
     * @param {Array} data - Array of documents as objects
     */
    async post(col,data) {
        try {
            const collection = await this.c.collection(col)
            await collection.insertMany(data)
        } catch(err) {
            console.log("MongoDB POST FAILURE:")
            console.log(err)
            process.exit(1)
        }
    }
}
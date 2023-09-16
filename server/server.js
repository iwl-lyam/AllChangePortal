import Mongo from './db.js'
import express from 'express'
import {graphql,
    buildSchema} from 'graphql'
import {ObjectId} from 'mongodb'

const con = new Mongo()

const schema = buildSchema(`
    type User {
        value: String
        _id: String
        type: String
    }
    type Query {
        name(_id: String): User
    }
`)

const app = express()
app.use(express.json())

const handleValues = {
    name: async ({_id}) => {
        console.log("HANDLER")
        let res
        await con.get("portal",{_id: new ObjectId(_id)}).then(r => {
            res = r[0]
        })
        return res
    }
}

app.post('/', (req, res) => {
    graphql({ schema, source:req.body.query, rootValue:handleValues }).then(response => {
        res.send(response)
    })
})

app.listen(8080)



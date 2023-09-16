import Mongo from './db.js'
import express from 'express'
import {graphql,
    buildSchema} from 'graphql'
import {ObjectId} from 'mongodb'

const con = new Mongo()

const schema = buildSchema(`
    type User{
\t_id: String
\tclearance: Clearance
\tusername: String
\tdisc_username: String
}

enum Clearance{
\tSTANDARD
\tSUPERVISOR
\tDEVELOPER
\tMANAGER
\tEXECUTIVE
\tADMIN
}

interface Post{
\ttitle: String
\t_id: String
\tauthor: User
\tlikes: Int
\tdescription: String
\ttimestamp: Int
}

type BugReport implements Post{
\ttitle: String
\t_id: String
\tauthor: User
\tlikes: Int
\tdescription: String
\ttimestamp: Int
\tdepartment: Departments
}

enum Departments{
\tSUPERVISOR
\tMODELLING
\tWEB
\tPROGRAMMING
\tGRAPHICS
\tDESIGN
}

type Suggestion implements Post{
\ttitle: String
\t_id: String
\tauthor: User
\tlikes: Int
\tdescription: String
\ttimestamp: Int
\tdepartment: Departments
}

type Query{
\tSuggestion(
\t\tid: String
\t): Suggestion
\tBugReport(
\t\tid: String
\t): BugReport
\tUser(
\t\tid: String
\t): User
}

mutation Mutation {
\tCreateSuggestion(su: Suggestion) {
\t\ttitle
\t\tauthor
\t\tlikes
\t\tdescription
\t\ttimestamp
\t\tdepartment
\t}
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



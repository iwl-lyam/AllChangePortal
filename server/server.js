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
\ttimestamp: String
}

type BugReport implements Post{
\ttitle: String
\t_id: String
\tauthor: User
\tlikes: Int
\tdescription: String
\ttimestamp: String
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
\ttimestamp: String
\tdepartment: Departments
}

type Query{
\tGetSuggestion(
\t\tid: String
\t): Suggestion
\tGetBugReport(
\t\tid: String
\t): BugReport
\tGetUser(
\t\tid: String
\t): User
}

schema{
\tquery: Query
\tmutation: Mutation
}

input PostInput{
\ttitle: String
\tdescription: String
\tdepartment: Departments
\tauthorID: String
\ttimestamp: String
}

type Mutation{
\tCreateSuggestion(
\t\tsu: PostInput
\t): Suggestion
\tCreateBugReport(
\t\tbr: PostInput
\t): BugReport
}
`)

const app = express()
app.use(express.json())

const handleValues = {
    // TODO: Handle authorID validation
    // TODO: Fill missing input fields in input

    CreateSuggestion: async ({su}) => {
        await con.post("suggestions", [su])
    },
    CreateBugReport: async ({br}) => {
        await con.post("bugreports", [br])
    },
    GetSuggestion: async ({id}) => {
        let res
        await con.get("suggestions",{_id: new ObjectId(id)}).then(r => {
            res = r[0]
        })
        return res
    },
    GetBugReport: async ({id}) => {
        let res
        await con.get("bugreports",{_id: new ObjectId(id)}).then(r => {
            res = r[0]
        })
        return res
    },
    GetUser: async ({id}) => {
        let res
        await con.get("users",{_id: new ObjectId(id)}).then(r => {
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



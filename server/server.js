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
\taccount_id: String
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
\tGetAccount(
\t\tid: String
\t): Account
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
}

input PostModifyInput{
\ttitle: String
\tdescription: String
\tdepartment: Departments
\t_id: String
}

type Mutation{
\tCreateSuggestion(
\t\tsu: PostInput
\t): Suggestion

\tCreateBugReport(
\t\tbr: PostInput
\t): BugReport

\tRegisterAccount(
\t\tacc: AccountRegisterInput
\t): Account

\tLoginAccount(
\t\tacc: AccountLoginInput
\t): Account

\tModifySuggestion(
\t\tsu: PostModifyInput
\t): Suggestion

\tModifyBugReport(
\t\tbr: PostModifyInput
\t): BugReport

\tModifyAccount(
\t\tacc: AccountModifyInput
\t): Account
}

type Account{
\tpassword: String
\tuser: User
\ttoken: String
\t_id: String
\tsalt: String
}

input AccountModifyInput{
\tusername: String
\tpassword: String
\tnews: Boolean
\t_id: String
}

input AccountRegisterInput{
\tusername: String
\tpassword: String
\tnews: Boolean
}

input AccountLoginInput{
\tusername: String
\tpassword: String
}
`)

const app = express()
app.use(express.json())

const handleValues = {
    // TODO: Handle authorID validation
    // TODO: Fill missing input fields in input

    CreateSuggestion: async ({su}) => {
        return await con.post("suggestions", [su])
    },
    CreateBugReport: async ({br}) => {
        return await con.post("bugreports", [br])
    },
    GetSuggestion: async ({id}) => {
        return await con.get("suggestions",{_id: new ObjectId(id)})
    },
    GetBugReport: async ({id}) => {
        return await con.get("bugreports",{_id: new ObjectId(id)})
    },
    GetUser: async ({id}) => {
        return await con.get("users",{_id: new ObjectId(id)})
    },
    RegisterAccount: async ({acc}) => {
        return await con.post("users", [acc])
    },
    ModifySuggestion: async ({su}) => {
        let data = su
        delete data._id
        return await con.patch("suggestion", su._id,{$set: data})
    },
    ModifyBugReport: async ({br}) => {
        let data = br
        delete data._id
        return await con.patch("users", br._id,{$set: data})
    },
    ModifyAccount: async ({acc}) => {
        let data = acc
        delete data._id
        return await con.patch("users", acc._id,{$set: data})
    }
}

app.post('/graphql', (req, res) => {
    graphql({ schema, source:req.body.query, rootValue:handleValues }).then(response => {
        res.send(response)
    })
})

app.listen(8080)



import Mongo from './db.js'
import express from 'express'
import {ObjectId} from 'mongodb'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

dotenv.config({path: "../public/.env"})
const secretkey = process.env.JWTSEC

const con = new Mongo()

const app = express()
app.use(express.json())
app.use(cors({allow: "*"}))

const RateLimitDefault = rateLimit({
    windowMs: 60 * 1000,  // 1-minute window
    max: 100,            // Limit each IP to 100 requests per windowMs
    message: { code: "429-1", msg: "Too many requests, please try again later." }
});

function Authorize(req,res,next) {
    if (!req.headers.authorization) {
        req.verified = false
        res.status(401)
        res.send(JSON.stringify({code: "401-1", msg: "Unauthorized"}))
    } else {
        const token = req.headers.authorization
        try {
            // Extract the JWT token from the header (remove "Bearer " prefix)
            const tokenData = token.replace('Bearer ', '');

            // Verify the token using your secret key
            jwt.verify(tokenData, secretkey, (error, decoded) => {
                if (error) {
                    req.verified = false
                    res.status(401).json({code: "401-2", msg: 'Invalid token', error});
                    return
                }

                // If the token is valid, you can access its payload in the `decoded` object
                req.user = decoded;
                req.verified = true
                next();
            });
        } catch (error) {
            req.verified = false
            res.status(500).json({code: "500-1", msg: 'Internal server error'});
        }
    }
}

// function AuthorizeApiKey(req,res,next) {
//     if (!req.headers.authorization) {
//         res.status(401)
//         res.send(JSON.stringify({code: "401-1", msg: "Unauthorized"}))
//         req.verified = false
//     } else {
//         if (req.headers.authorization === process.env.VITE_REACT_APP_API_KEY) {
//             req.verified = true
//             next()
//         } else {
//             res.status(401)
//             res.send(JSON.stringify({code: "401-4", msg: "Incorrect Master API Key on protected request"}))
//             req.verified = false
//         }
//     }
// }

app.use((req, res, next) => {
    console.log("LOGGING: " + req.path)
    next()
})

app.get('/rpc/getUserStatus', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    const user = await con.get("users", {username: req.user.username})
    console.log(user[0])
    res.send({status: parseInt(user[0].perm) || 0})
})

app.post('/api/users', RateLimitDefault, async (req, res) => {
    if ((await con.get("users", {username: req.body.uname}))[0]) {
        res.status(400)
        res.send({code: "400-1", msg: "User already exists"})
        return
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const output = {
        username: req.body.uname,
        password: hashedPassword,
        salt: salt,
        perm: 0
    }
    await con.post("users", [output])
    res.send()
})

app.post('/api/users/login', RateLimitDefault, async (req, res) => {
    const user = await con.get("users", {username: req.body.uname})
    if (!user[0]) {
        res.status(400)
        res.send({code: "400-2", msg: "Incorrect username"})
        return
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user[0].password);
    if (!isPasswordValid) {
        res.status(401)
        res.send({code: "401-3", msg: "Password auth failed"})
    } else {
        res.send({"token": jwt.sign(user[0], secretkey)})
    }
})

app.get('/api/suggestions', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    let filter = {}
    if (req.query.user !== "1" && req.query.user) filter.authorId = new ObjectId(req.query.user)
    else if (req.query.user === "1") filter.authorId = new ObjectId(req.user._id)
    if (req.query.status) filter.status = parseInt(req.query.status)
    const data = await con.get("suggestions", filter)
    res.send(data)
})
app.post('/api/suggestions', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    const payload = {
        authorId: new ObjectId(req.user._id),
        status: 0,
        ...req.body
    }
    await con.post("suggestions", [payload])
    res.send()
})
app.post('/rpc/approve_suggestion', RateLimitDefault, Authorize, async (req, res) => {
    await con.patch("suggestions", {_id: new ObjectId(req.body.postid)}, {$set: {status: 1, comment: req.body.comment}})
    const n = await con.get("suggestions", {_id: new ObjectId(req.body.postid)})
    console.log(n)
    await con.post("notifs", [{user: n[0].authorId, ack: 0, title: "Suggestions", desc: `Your suggestion ${n[0].title} was approved and sent to developers. The comment was "${req.body.comment}"`}])
    res.send()
})
app.post('/rpc/deny_suggestion', RateLimitDefault, Authorize, async (req, res) => {
    await con.patch("suggestions", {_id: new ObjectId(req.body.postid)}, {$set: {status: 2, comment: req.body.comment}})
    const n = await con.get("suggestions", {_id: new ObjectId(req.body.postid)})
    await con.post("notifs", [{user: n[0].authorId, ack: 0, title: "Suggestions", desc: `Your suggestion ${n[0].title} was denied. The comment was "${req.body.comment}"`}])
    res.send()
})

app.get('/api/bugreports', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    let filter = {}
    if (req.query.user) filter.authorId = new ObjectId(req.query.user)
    if (req.query.status) filter.status = parseInt(req.query.status)
    const data = await con.get("bugreports", filter)
    res.send(data)
})
app.post('/api/bugreports', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    const payload = {
        authorId: new ObjectId(req.user._id),
        status: 0,
        ...req.body
    }
    await con.post("bugreports", [payload])
    res.send()
})
app.post('/rpc/approve_bugreport', RateLimitDefault, Authorize, async (req, res) => {
    await con.patch("bugreports", {_id: new ObjectId(req.body.postid)}, {$set: {status: 1, comment: req.body.comment}})
    res.send()
})
app.post('/rpc/deny_bugreport', RateLimitDefault, Authorize, async (req, res) => {
    await con.patch("bugreports", {_id: new ObjectId(req.body.postid)}, {$set: {status: 2, comment: req.body.comment}})
    res.send()
})

app.get('/api/tasks', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    let filter = {}
    if (req.query.assignee) filter.assignee = new ObjectId(req.query.assignee)
    if (req.query.taskid) filter.taskid = new ObjectId(req.query.taskid)
    if (req.query.status) filter.status = parseInt(req.query.status)
    const data = await con.get("tasks", filter)
    res.send(data)
})
app.post('/api/tasks', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    const payload = {
        setBy: new ObjectId(req.user._id),
        ...req.body,
    }
    await con.post("tasks", [payload])
    res.send()
})

app.get('/api/notifs', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    const notifs = await con.get("notifs", {user: new ObjectId(req.user._id), ack: 0})
    res.send(notifs)
})
app.post('/rpc/dismissNotif', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    await con.patch("notifs", {_id: new ObjectId(req.query.id)}, {$set: {ack: 1}})
    res.send()
})

app.post('/rpc/assignTask', RateLimitDefault, Authorize, async (req, res) => {
    if (!req.verified) return
    await con.patch("tasks", {_id: new ObjectId(req.body.id)}, {$set: {status: 1, info: req.body.info, recipient: req.body.recipient, date: req.body.date}})
    res.send()
})

app.listen(8080)



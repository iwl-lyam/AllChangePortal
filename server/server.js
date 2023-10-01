import Mongo from './db.js'
import express from 'express'
import {ObjectId} from 'mongodb'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path: "../public/.env"})
const secretkey = process.env.JWTSEC

const con = new Mongo()

const app = express()
app.use(express.json())
app.use(cors({allow: "*"}))

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

function AuthorizeApiKey(req,res,next) {
    if (!req.headers.authorization) {
        res.status(401)
        res.send(JSON.stringify({code: "401-1", msg: "Unauthorized"}))
    } else {
        if (req.headers.authorization === process.env.VITE_MASTERAPIKEY) {
            req.verified = true
            next()
        } else {
            res.status(401)
            res.send(JSON.stringify({code: "401-4", msg: "Incorrect Master API Key on protected request"}))
        }
    }
}

app.use((req, res, next) => {
    console.log("LOGGING: " + req.baseUrl)
    next()
})

app.post('/api/users', AuthorizeApiKey, async (req, res) => {
    if (!req.verified) return
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
        salt: salt
    }
    await con.post("users", [output])
    res.send()
})

app.post('/api/users/login', AuthorizeApiKey, async (req, res) => {
    if (!req.verified) return
    const user = await con.get("users", {username: req.body.uname})
    const isPasswordValid = await bcrypt.compare(req.body.password, user[0].password);
    if (!isPasswordValid) {
        res.code(401)
        res.send({code: "401-3", msg: "Password auth failed"})
    } else {
        res.send({"token": jwt.sign(user[0], secretkey)})
    }
})

app.get('/api/suggestions', Authorize, async (req, res) => {
    if (!req.verified) return
    const data = await con.get("suggestions", {})
    res.send(data)
})
app.post('/api/suggestions', Authorize, async (req, res) => {
    if (!req.verified) return
    const payload = {
        authorId: new ObjectId(req.user._id),
        ...req.body
    }
    await con.post("suggestions", [payload])
    res.send()
})

app.get('/api/bugreports', Authorize, async (req, res) => {
    if (!req.verified) return
    const data = await con.get("bugreports", {})
    res.send(data)
})
app.post('/api/bugreports', Authorize, async (req, res) => {
    if (!req.verified) return
    const payload = {
        authorId: new ObjectId(req.user._id),
        ...req.body
    }
    await con.post("bugreports", [payload])
    res.send()
})

app.listen(8080)



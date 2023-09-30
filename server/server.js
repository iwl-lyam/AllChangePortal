import Mongo from './db.js'
import express from 'express'
import {ObjectId} from 'mongodb'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretkey = process.env.JWTSEC

const con = new Mongo()

const app = express()
app.use(express.json())
app.use(cors({allow: "*"}))

app.use(async (req, res, next) => {
    console.log(req.headers)
    if (!req.headers.authorization) {
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
                    res.status(401).json({ code: "401-2", msg: 'Invalid token', error });
                }

                // If the token is valid, you can access its payload in the `decoded` object
                req.user = decoded;
                req.verified = true
                next();
            });
        } catch (error) {
            req.verified = false
            res.status(500).json({ code: "500-1", msg: 'Internal server error' });
        }
    }
})

app.post('/api/users', async (req, res) => {
    if (!req.verified) return
    if ((await con.get("users", {username: req.body.uname}))[0]) {
        console.log(await con.get("users", {username: req.body.uname}))
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

app.post('/api/users/login', async (req, res) => {
    if (!req.verified) return
    const user = await con.get("users", {username: req.body.uname})
    console.log(req.body.password)
    console.log(user)
    const isPasswordValid = await bcrypt.compare(req.body.password, user[0].password);
    if (!isPasswordValid) {
        res.code(401)
        res.send({code: "401-3", msg: "Password auth failed"})
    } else {
        res.send({"token": jwt.sign(user[0], secretkey)})
    }
})

app.listen(8080)



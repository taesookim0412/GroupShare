import express = require('express')
import mongoose = require('mongoose')

const accounts = mongoose.model("accounts")
import bcrypt = require('bcrypt')
const jwt = require("./../configs/jwt")
import {EnforceDocument} from "mongoose";
import {createFailed, createSuccessful} from "../configs/global/Objects/Success";

export interface AccountQuery {
    username: string,
    password: string
}

function createToken(username: string){
    return jwt.sign({auth: "user"}, username)
}

module.exports = {
    login: (req: express.Request, res: express.Response) => {
        accounts.findOne({username: req.body.username}, null, null, (err, data: EnforceDocument<AccountQuery, any>) => {
            if (err || data === null || req.body.username === null || req.body.password === null){
                res.json(createFailed())
            }
            else{
                bcrypt.compare(req.body.password, data.password).then(result => {
                    if (result) {
                        const token = createToken(req.body.username)
                        res.cookie("SESSIONID", token, {httpOnly: true, maxAge: 86400000 })
                        res.json({...createSuccessful(), ...{token: token, username: req.body.username, expiresIn: 86400000 }})
                    } else {
                        res.json({status: "wrong_password"})
                    }
                })

            }
        })
    },
    create: (req: express.Request, res: express.Response) => {
        if (req.body.password === undefined || typeof req.body.password != "string") {
            res.json(createFailed())
        } else {
            bcrypt.hash(req.body.password, 10)
                .then(hashed_password =>
                    accounts.create({
                        username: req.body.username,
                        password: hashed_password
                    }, () => res.json(createSuccessful()))
                )
        }
    },
}
import {createSuccessful} from "../configs/global/Objects/Success";

const uploads = require("./uploads")
const accounts = require('./accounts')
import express = require('express')
import mongoose = require('mongoose')

const videos = mongoose.model("videos")
const jwt = require("./../configs/jwt")


module.exports = (app: express.Application) => {
    app.get("/api/video/all", (req: express.Request, res: express.Response) => {
        videos.find({}, (err, data) => {
            res.json({...createSuccessful(), videos: data})
        })
    })
    // /api/video/one/${id}
    app.get("/api/video/one/:id", (req: express.Request, res: express.Response) => {
        videos.find({_id: req.params.id}, (err, data) => {
            res.json({...createSuccessful(), videos: data})
        })
    })
    app.post("/api/video", (req: express.Request, res: express.Response) => {
        if (jwt.verify(req.headers.token, req.headers.author) !== false) {
            uploads.postVideo(req, res)
        }
    })
    app.post("/api/login/create", (req, res) => {
        accounts.create(req, res)
    })
    app.post("/api/login/login", (req, res) => {
        accounts.login(req, res)
    })
}
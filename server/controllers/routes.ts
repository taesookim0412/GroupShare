const uploads = require("./uploads")
import express = require('express')
import mongoose = require('mongoose')

const videos = mongoose.model("videos")

module.exports = (app: express.Application) => {
    app.get("/api/video/all", (req: express.Request, res: express.Response) => {
        videos.find({}, (err, data) => {
            res.json({status: "successful", videos: data})
        })
    })
    // /api/video/one/${id}
    app.get("/api/video/one/:id", (req: express.Request, res: express.Response) => {
        videos.find({_id: req.params.id}, (err, data) => {
            res.json({status: "successful", videos: data})
        })
    })
    app.post("/api/video", (req: express.Request, res: express.Response) => {
        uploads.postVideo(req, res)
    })
    app.post("/test", (req: express.Request, res: express.Response) => {
        console.log(req.body)
    })
}
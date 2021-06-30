const uploads = require("./uploads")
import express = require('express')
const mongoose = require('mongoose')
const videos = mongoose.model("videos")

module.exports = (app: express.Application) => {
    app.get("/api/video", (req:express.Request, res:express.Response) => {
        videos.find({}, (data:any) => {
            console.log(data)
        })
    })
    app.post("/api/video", (req:express.Request, res:express.Response) => {
        uploads.postVideo(req, res)
    })
    app.post("/test",  (req:express.Request, res:express.Response) => {
        console.log(req.body)
    })
}
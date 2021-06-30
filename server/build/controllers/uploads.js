"use strict";
// import {CallbackError} from "mongoose";
//
// const mongoose = require("mongoose")
//
// const video = mongoose.model("videos");
//
// const multer = require('multer')
// const s3conf = require('./../configs/s3.ts')
// const S3VideoUpload = multer({storage:s3conf.video}).single('file')
//
// //TODO: Add JWT
// module.exports = {
//     postVideo: (req, res) => {
//        S3VideoUpload(req, res, (err:CallbackError) => {
//            const videoPost = {
//                author: req.body.author,
//                description: req.body.description,
//                url: req.file['location'],
//                src: req.file['location'],
//                thumbnail: "",
//                title: req.body.title
//                //TODO: url encoder or index by id
//                //TODO: Add thumbnail functionality
//            }
//            video.create(videoPost, (err:CallbackError) => {
//                if (err) { res.json({status: "failed"}) }
//                res.json({status: 'successful'});
//            })
//        })
//     }
// }

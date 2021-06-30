import mongoose = require("mongoose")
import {CallbackError} from "mongoose";
import express = require("express")

const video = mongoose.model("videos");

const multer = require('multer')
const s3conf = require('./../configs/s3.ts')
const S3VideoUpload = multer({storage: s3conf.video}).single('video')


//TODO: Add JWT
//TODO: Add type def for req.file
export function postVideo(req:express.Request, res:express.Response) {
    S3VideoUpload(req, res, (err: mongoose.CallbackError) => {
        const videoPost = {
            author: req.body.author,
            description: req.body.description,
            // @ts-ignore
            url: req.file['location'],
            // @ts-ignore
            src: req.file['location'],
            thumbnail: "",
            title: req.body.title
            //TODO: url encoder or index by id
            //TODO: Add thumbnail functionality
        }
        video.create(videoPost, (err: CallbackError) => {
            if (err) {
                res.json({status: "failed"})
            }
            res.json({status: 'successful'});
        })
    })
}
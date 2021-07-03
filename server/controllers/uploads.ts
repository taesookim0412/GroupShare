import mongoose = require("mongoose")
import {CallbackError} from "mongoose";
import express = require("express")
import {createFailed} from "../configs/global/Objects/Success";

const video = mongoose.model("videos");

const multer = require('multer')
const s3conf = require('./../configs/s3')
const S3VideoUpload = multer({storage: s3conf.video}).single('video')

//TODO: Add JWT
//TODO: Add type def for req.file
export function postVideo(req:express.Request, res:express.Response) {
    S3VideoUpload(req, res, (err: mongoose.CallbackError) => {
        //generate
        // @ts-ignore
        if (req.file === undefined) { return res.json(createFailed())}
        const videoPost = {
            author: req.body.author,
            date: Date.now(),
            description: req.body.description,
            likes: 0,
            // @ts-ignore
            src: req.file['location'],
            thumbnail: "",
            title: req.body.title,
            views: 0,
            //TODO: url encoder or index by id
            //TODO: Add thumbnail functionality
        }
        video.create(videoPost, (err: CallbackError, data) => {
            if (err) {
                res.json({status: "failed"});
            }
            res.json({status: 'successful', video: data});
        })
    })
}
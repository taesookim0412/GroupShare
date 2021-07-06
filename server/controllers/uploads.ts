import mongoose = require("mongoose")
import {CallbackError} from "mongoose";
import express = require("express")
import {createFailed} from "../configs/global/Objects/Success";

const video = mongoose.model("videos");

const multer = require('multer')
const s3conf = require('./../configs/s3')
const S3VideoUpload = multer({storage: s3conf.video}).array('files')

//TODO: Add JWT
//TODO: Add type def for req.file
export function postVideo(req:express.Request, res:express.Response) {
    S3VideoUpload(req, res, (err: mongoose.CallbackError) => {
        if (err) console.log(err)
        // @ts-ignore
        if (req.files === undefined || req.files.length < 3) { return res.json(createFailed())}
        //files : [gifs, pngs, video]
        const videoPost = {
            author: req.body.author,
            date: Date.now(),
            description: req.body.description,
            likes: 0,
            // @ts-ignore
            src: req.files[2]['location'],
            // @ts-ignore
            thumbnailGif: req.files[0]['location'],
            // @ts-ignore
            thumbnailPng: req.files[1]['location'],
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
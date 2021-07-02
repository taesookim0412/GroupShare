"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postVideo = void 0;
var mongoose = require("mongoose");
var video = mongoose.model("videos");
var multer = require('multer');
var s3conf = require('./../configs/s3');
var S3VideoUpload = multer({ storage: s3conf.video }).single('video');
//TODO: Add JWT
//TODO: Add type def for req.file
function postVideo(req, res) {
    S3VideoUpload(req, res, function (err) {
        //generate
        var videoPost = {
            author: req.body.author,
            description: req.body.description,
            // @ts-ignore
            src: req.file['location'],
            thumbnail: "",
            title: req.body.title
            //TODO: url encoder or index by id
            //TODO: Add thumbnail functionality
        };
        video.create(videoPost, function (err) {
            if (err) {
                res.json({ status: "failed" });
            }
            res.json({ status: 'successful' });
        });
    });
}
exports.postVideo = postVideo;

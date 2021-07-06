"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
module.exports = function () {
    var VideosSchema = new mongoose.Schema({
        author: { type: String },
        date: { type: Date },
        description: { type: String },
        likes: { type: Number },
        src: { type: String },
        thumbnailGif: { type: String },
        thumbnailPng: { type: String },
        title: { type: String },
        views: { type: Number }
    });
    var videos = mongoose.model("videos", VideosSchema);
};

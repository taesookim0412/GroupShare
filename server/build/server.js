"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// @ts-ignore
var bodyparser = require('body-parser');
var path = require("path");
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var app = require('express')();
//goes before multer..
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var getKeysDirectory = function () {
    var currpath = __dirname.replace(/\\/g, "/");
    var strs = currpath.split("/");
    //Outside of repo directory, into keys directory.
    if (strs.includes("build")) {
        return path.join(__dirname, "..", "..", "build");
    }
    else {
        return path.join(__dirname, "..", "build");
    }
};
app.use(express.static(getKeysDirectory()));
getKeysDirectory = function () { return ""; };
require("./configs/mongoose")();
require("./controllers/routes")(app);
// require("./configs/mongoose.ts")(mongoose)
// getVideo(app)
// app.get("/videos", (req, res) => {
//     res.json({status: "Success"})
// })
app.listen(8000, function () {
    console.log("Listening on port 8000");
});

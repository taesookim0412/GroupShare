"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// @ts-ignore
var bodyparser = require('body-parser');
var path = require("path");
var axios_1 = __importDefault(require("axios"));
var Success_1 = require("./configs/global/Objects/Success");
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const aws = require('aws-sdk');
var cors = require('cors');
var process = require('process');
var app = require('express')();
//goes before multer..
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// TODO: Fix Routing
// app.get(/\/[a-z]/, (req, res) =>  {
//     console.log('catchall')
//     res.redirect("/")
// })
// app.get('*', (req, res) => {
//     console.log('asd')
//     res.render(indexpath)
// })
// app.get("*", (req, res) =>  res.redirect("/"))
require("./configs/mongoose")();
require("./controllers/routes")(app);
var getMainDirectory = function (folderName) {
    var currpath = process.cwd().replace(/\\/g, "/");
    var strs = currpath.split("/");
    //Outside of repo directory, into keys directory.
    if (strs.includes("build")) {
        return path.join(process.cwd(), "..", "..", folderName);
    }
    else {
        return path.join(process.cwd(), "..", folderName);
    }
};
app.use(express.static(getMainDirectory("build")));
app.use(express.static(getMainDirectory("assets")));
// TODO: Fix Routing
app.use("*", express.static(getMainDirectory("build")));
// app.get("*", (req, res) => res.sendFile(indexpath))
getMainDirectory = function () { return ""; };
//download as base64 encoded arraybuffer string (351ms, 1.91MB / ~10MB) (Networking VS Performance)
app.post("/test_file", function (req_0, res_0) {
    if (req_0.body.url === undefined || typeof req_0.body.url !== "string")
        res_0.json(Success_1.createFailed());
    axios_1.default.get(req_0.body.url, { responseType: 'arraybuffer' }).then(function (data) {
        var fp = req_0.body.url.split(".");
        res_0.json({ data: "data:video/" + fp[fp.length - 1] + ";base64," + Buffer.from(data.data, 'binary').toString('base64') });
    });
});
//download as binary data (453ms, 3.45MB/ ~10MB) ? (seems to be binary data)
// app.post("/test_file", (req_0, res_0) => {
//     axios.get(req_0.body.url, {responseType: 'blob'}).then((data) => {
//         res_0.json({data: data.data})
//     })
// })
//download to server
// app.post("/test_file", (req_0, res_0) => {
//     const writer = createWriteStream("./downloads");
//     axios.get(req_0.body.url, {responseType: "stream"}).then((data) => {
//         data.data.pipe(writer)
//         writer.on('close', () => {
//             res_0.json(createSuccessful())
//         })
//     })
// })
// require("./configs/mongoose.ts")(mongoose)
// getVideo(app)
// app.get("/videos", (req, res) => {
//     res.json({status: "Success"})
// })
app.listen(8000, function () {
    console.log("Listening on port 8000");
});

import express = require('express')
// @ts-ignore
const bodyparser = require('body-parser')
import path = require('path')
import axios from "axios";
import {createWriteStream} from "fs";
import {createFailed, createSuccessful} from "./configs/global/Objects/Success";
import {log} from "util";
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const aws = require('aws-sdk');
const cors = require('cors')
const process = require('process')


const app: express.Application = require('express')()
//goes before multer..
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


let getMainDirectory = (folderName: string) => {
    const currpath = process.cwd().replace(/\\/g, "/")
    const strs = currpath.split("/")
    //Outside of repo directory, into keys directory.
    if (strs.includes("build")) {
        return path.join(process.cwd(), "..", "..", folderName)
    } else {
        return path.join(process.cwd(), "..", folderName)
    }
}
require("./configs/mongoose")()
require("./controllers/routes")(app)
app.use(express.static(getMainDirectory("build")))
app.use(express.static(getMainDirectory("assets")))
// TODO: Fix Routing
app.use("*", express.static(getMainDirectory("build")))
// app.get("*", (req, res) => res.sendFile(indexpath))
getMainDirectory = () => ""



//download as base64 encoded arraybuffer string (351ms, 1.91MB / ~10MB) (Networking VS Performance)
app.post("/test_file", (req_0, res_0) => {
    if (req_0.body.url === undefined || typeof req_0.body.url !== "string") res_0.json(createFailed())
    axios.get(req_0.body.url, {responseType: 'arraybuffer'}).then((data) => {
        const fp = req_0.body.url.split(".")
        res_0.json({data: `data:video/${fp[fp.length-1]};base64,` + Buffer.from(data.data, 'binary').toString('base64')});
    })
})
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

app.listen(8000, () => {
    console.log("Listening on port 8000")
})
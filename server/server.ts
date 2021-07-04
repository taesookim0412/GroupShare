import express = require('express')
// @ts-ignore
const bodyparser = require('body-parser')
import path = require('path')
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const app:express.Application = require('express')()
//goes before multer..
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

let getKeysDirectory = () => {
    const currpath = __dirname.replace(/\\/g, "/")
    const strs = currpath.split("/")
    //Outside of repo directory, into keys directory.
    if(strs.includes("build")){
        return path.join(__dirname, "..", "..", "build")
    }
    else{
        return path.join(__dirname, "..", "build")
    }
}
app.use(express.static(getKeysDirectory()))
getKeysDirectory = () => ""

require("./configs/mongoose")()
require("./controllers/routes")(app)

// require("./configs/mongoose.ts")(mongoose)
// getVideo(app)
// app.get("/videos", (req, res) => {
//     res.json({status: "Success"})
// })

app.listen(8000, () => {
    console.log("Listening on port 8000")
})
import express = require('express')
import path = require('path')
const app:express.Application = require('express')()
// @ts-ignore
const bodyparser = require('body-parser')
//goes before multer..
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use(express.static(path.join(__dirname, "..", "build")))

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
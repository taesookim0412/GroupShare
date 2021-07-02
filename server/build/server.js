"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
// @ts-ignore
var bodyparser = require('body-parser');
//goes before multer..
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
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

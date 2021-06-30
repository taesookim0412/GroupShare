"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("./controllers/routes");
var app = require('express')();
// @ts-ignore
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// require("./configs/mongoose.ts")(mongoose)
routes_1.getVideo(app);
// app.get("/videos", (req, res) => {
//     res.json({status: "Success"})
// })
app.listen(8000, function () {
    console.log("Listening on port 8000");
});

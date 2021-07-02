"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");
module.exports = function () {
    mongoose.connect("mongodb://localhost:27017/groupshare", { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
    var model_path = path.join(__dirname, './../models');
    fs.readdirSync(model_path).forEach(function (file) {
        if (file.indexOf('.ts') > 0 || file.indexOf('.js') > 0) {
            require(model_path + "/" + file)();
        }
    });
};

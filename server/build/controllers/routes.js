"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Success_1 = require("../configs/global/Objects/Success");
var uploads = require("./uploads");
var accounts = require('./accounts');
var mongoose = require("mongoose");
var videos = mongoose.model("videos");
module.exports = function (app) {
    app.get("/api/video/all", function (req, res) {
        videos.find({}, function (err, data) {
            res.json(__assign(__assign({}, Success_1.createSuccessful()), { videos: data }));
        });
    });
    // /api/video/one/${id}
    app.get("/api/video/one/:id", function (req, res) {
        videos.find({ _id: req.params.id }, function (err, data) {
            res.json(__assign(__assign({}, Success_1.createSuccessful()), { videos: data }));
        });
    });
    app.post("/api/video", function (req, res) {
        uploads.postVideo(req, res);
    });
    app.post("/api/login/create", function (req, res) {
        accounts.create(req, res);
    });
    app.post("/api/login/login", function (req, res) {
        accounts.login(req, res);
    });
};

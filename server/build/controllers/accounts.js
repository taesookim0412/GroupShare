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
var mongoose = require("mongoose");
var accounts = mongoose.model("accounts");
var bcrypt = require("bcrypt");
var jwt = require("./../configs/jwt");
var Success_1 = require("../configs/global/Objects/Success");
function createToken(username) {
    return jwt.sign({ auth: "user" }, username);
}
module.exports = {
    login: function (req, res) {
        accounts.findOne({ username: req.body.username }, null, null, function (err, data) {
            if (err || data === null || req.body.username === null || req.body.password === null) {
                res.json(Success_1.createFailed());
            }
            else {
                bcrypt.compare(req.body.password, data.password).then(function (result) {
                    if (result) {
                        var token = createToken(req.body.username);
                        res.cookie("SESSIONID", token, { httpOnly: true, maxAge: 86400000 });
                        res.json(__assign(__assign({}, Success_1.createSuccessful()), { token: token, username: req.body.username, expiresIn: 86400000 }));
                    }
                    else {
                        res.json({ status: "wrong_password" });
                    }
                });
            }
        });
    },
    create: function (req, res) {
        if (req.body.password === undefined || typeof req.body.password != "string") {
            res.json(Success_1.createFailed());
        }
        else {
            bcrypt.hash(req.body.password, 10)
                .then(function (hashed_password) {
                return accounts.create({
                    username: req.body.username,
                    password: hashed_password
                }, function () { return res.json(Success_1.createSuccessful()); });
            });
        }
    },
};

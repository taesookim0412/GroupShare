"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = void 0;
var fs = require("fs");
var jwt = require("jsonwebtoken");
var path = require("path");
var getKeysDirectory = function () {
    var currpath = __dirname.replace(/\\/g, "/");
    var strs = currpath.split("/");
    //Outside of repo directory, into keys directory.
    if (strs.includes("build")) {
        return path.join(__dirname, "..", "..", "..", "..", "keys");
    }
    else {
        return path.join(__dirname, "..", "..", "..", "keys");
    }
};
var privateKEY = fs.readFileSync(path.join(getKeysDirectory(), "privatekey.ppk"), 'utf8');
var publicKEY = fs.readFileSync(path.join(getKeysDirectory(), "public.key"), 'utf8');
getKeysDirectory = function () { return ""; };
module.exports = {
    sign: function (payload, username) {
        var sOptions = {
            issuer: "Authorization/User/GroupShare",
            subject: username,
        };
        var signOptions = {
            algorithm: "RS256",
            expiresIn: "1d",
            issuer: sOptions.issuer,
            subject: sOptions.subject
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    verify: function (token, username) {
        if (username === undefined || username === null || username === "") {
            return false;
        }
        var Option = {
            issuer: "Authorization/User/GroupShare",
            subject: username,
        };
        var verifyOptions = {
            issuer: Option.issuer,
            subject: Option.subject,
            expiresIn: "1d",
            algorithm: "RS256"
        };
        try {
            return jwt.verify(token, publicKEY, verifyOptions);
        }
        catch (err) {
            return false;
        }
    },
    decode: function (token) {
        return jwt.decode(token, { complete: true });
    }
};
function sign(arg0, username) {
    throw new Error('Function not implemented.');
}
exports.sign = sign;

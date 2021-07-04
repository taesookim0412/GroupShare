"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
module.exports = function () {
    var AccountSchema = new mongoose.Schema({
        username: { type: String },
        password: { type: String }
    });
    mongoose.model("accounts", AccountSchema);
};

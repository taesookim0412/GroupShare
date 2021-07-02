"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aws = require("aws-sdk");
var multerS3 = require('multer-s3');
var s3 = new aws.S3({ credentials: new aws.SharedIniFileCredentials({ profile: 'groupshare' }) });
//TODO: Interface File
module.exports = {
    video: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'groupsharetk',
        metadata: function (req, file, cb) { return cb(null, { fieldName: file.fieldname }); },
        key: function (req, file, cb) {
            cb(null, "videos/" + Date.now() + " " + file.originalname);
        }
    })
};

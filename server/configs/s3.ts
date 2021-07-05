import aws = require('aws-sdk');
const multerS3 = require('multer-s3');
// const s3 = new aws.S3({ credentials: new aws.SharedIniFileCredentials({ profile: 'groupshare' })});
const s3 = new aws.S3();

import express = require('express')

//TODO: Interface File
module.exports = {
    video: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'groupsharetk',
        metadata: (req:express.Request, file:any, cb:Function) => cb(null, {fieldName: file.fieldname}),
        key: (req:express.Request, file:any, cb:Function) => {
            cb(null, `videos/${Date.now()} ${file.originalname}`);
        }
    })
}
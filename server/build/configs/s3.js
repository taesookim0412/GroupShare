"use strict";
// const aws = require('aws-sdk');
// const multerS3 = require('multer-s3');
// const s3 = new aws.S3({ credentials: new aws.SharedIniFileCredentials({ profile: 'groupshare' })});
//
// module.exports = {
//     video: multerS3({
//         s3: s3,
//         acl: 'public-read',
//         bucket: 'groupshare',
//         metadata: (req, file, cb) => cb(null, {fieldName: file.fieldname}),
//         key: (req, file, cb) => {
//             cb(null, `videos/${Date.now()} ${file.originalname}`);
//         }
//     })
// }

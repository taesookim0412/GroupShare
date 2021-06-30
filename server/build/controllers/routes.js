"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideo = void 0;
var uploads = require("./../controllers/uploads");
function getVideo(app) {
    app.get("/api/video", function (req, res) {
        console.log(req, res);
        res.json({ asd: "asd" });
        // uploads.postVideo(req, res)
    });
}
exports.getVideo = getVideo;

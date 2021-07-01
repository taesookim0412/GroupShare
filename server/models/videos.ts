import mongoose = require('mongoose')

module.exports = () => {
    const VideosSchema = new mongoose.Schema({
        author: {type: String},
        description: {type: String},
        likes: {type: Number},
        src: {type: String},
        thumbnail: {type: String},
        title: {type: String},
        url: {type: String},
        views: {type: Number}
    });
    const videos = mongoose.model("videos", VideosSchema);

}
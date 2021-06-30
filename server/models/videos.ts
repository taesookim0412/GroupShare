import mongoose = require('mongoose')

module.exports = () => {
    const VideosSchema = new mongoose.Schema({
        title: {type: String},
        author: {type: String},
        src: {type: String},
        url: {type: String},
        thumbnail: {type: String}
    });
    const videos = mongoose.model("videos", VideosSchema);
    // videos.create({title: "",
    // author: "",
    // src: "",
    // url: "",
    // thumbnail: ""})

}
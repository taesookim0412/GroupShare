module.exports = (mongoose) => {
    const VideosSchema = new mongoose.Schema({
        title: {type: String},
        author: {type: String},
        src: {type: String},
        url: {type: String},
        thumbnail: {type: String}
    });
    mongoose.model("videos", VideosSchema);
}
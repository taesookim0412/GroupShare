const fs = require('fs')
const path = require('path')

module.exports = (mongoose) => {
    mongoose.connect("mongodb://localhost:27017/groupshare", {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true});
    const model_path = path.join(__dirname, './../models');
    fs.readdirSync(model_path).forEach((file) => {
        if (file.indexOf('.tsx') > 0) {
            require(model_path + '/' + file)(mongoose);
        }
    })
}
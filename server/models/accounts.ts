import mongoose = require("mongoose")
module.exports = () => {
    const AccountSchema = new mongoose.Schema({
        username: {type: String},
        password: {type: String}
    })
    mongoose.model("accounts", AccountSchema)
}
const mongoose      = require('mongoose');
const Schema           = mongoose.Schema
const HomeSchema = new Schema({
    homeName:{
        type: String
    },
    _id:{
        type: String,
        required: true,
        unique: true,
        isPrimary: true
    },
    roomIdsArr:{
        type: Array,
        "default" : []
    },
},{timestamps: true})

const Home = mongoose.model('Home',HomeSchema)
module.exports = Home
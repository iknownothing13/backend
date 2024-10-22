const mongoose      = require('mongoose');
const Schema           = mongoose.Schema
const roomSchema = new Schema({
    _id:{
        type: String,
        required: true,
        unique: true,
        isPrimary: true
    },
    activityArr:{
        type: Array,
        "default" : []
    },
    predictionArr:{
        type: Array,
        "default" : [][10]
    },
    probabilityArr:{
        type: Array,
        "default" : [][10]
    },
    timestampArr:{
        type: Array,
        "default" : [][10]
    }
},{timestamps: true})

const Node = mongoose.model('Node',roomSchema)
module.exports = Node
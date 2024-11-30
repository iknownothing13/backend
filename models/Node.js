const mongoose      = require('mongoose');
const Schema           = mongoose.Schema
const roomSchema = new Schema({
    _id:{
        type: Number,
        required: true,
        unique: true,
        isPrimary: true
    },
    nodeValue:{
        type: Number,
        required: true
    },
    activityData:{
        type : mongoose.Schema.Types.Mixed,
        "default" : [],
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    // predictionArr:{
    //     type: Array,
    //     "default" : [][10]
    // },
    // probabilityArr:{
    //     type: Array,
    //     "default" : [][10]
    // },
    timestampArr:{
        type: [Date], // Assuming it's an array of timestamps
        // required: true,
        default: [],
    }
},{timestamps: true})

const Node = mongoose.model('Node',roomSchema)
module.exports = Node
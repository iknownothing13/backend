const Node = require( "../models/Node" );
const mongoose = require("mongoose");
const {Types} = require("mongoose");

//show the list of Families
const index = (req,res,next)=>{
    console.log('Print this');
    Node.find()
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(err=>{
            res.json({
                message:`An error Occurred : ${err}`,
            })
        })
}

//show single family details
const show=(req,res,next)=>{
    console.log('Show print is');
    //console.log('Starting');
    let node_id = req.body._id
    Node.findById(node_id)
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(err=>{
            res.json({
                message:`An error Occurred : ${err}`
            })
        })
}

//Add new Family
const store=(req,res,next)=>{
    console.log('Save started');
    let nodeObj = new Node({
        activityArr : req.body.activityArr,
        _id   : req.body._id,
        predictionArr : req.body.predictionArr,
        probabilityArr : req.body.probabilityArr,
        timestampArr : req.body.timestampArr,
    })
    nodeObj.save()
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(err=>{
            res.json({
                message:`An error Occurred : ${err}`
            })
        })
}

//Update Family Details
const update = (req,res,next)=>{
    console.log('Starting');
    let nodeId = req.body._id
    let updatedRoomData = {
        activityArr : req.body.activityArr,
        predictionArr : req.body.predictionArr,
        probabilityArr : req.body.probabilityArr,
        timestampArr : req.body.timestampArr,
    }
    Node.findByIdAndUpdate(nodeId,{$set:updatedRoomData},)
        .then(response=>{
            res.json({
                message:'Node Details Updated Successfully'
            })
        })
        .catch(err=>{
            res.json({
                message:`An error Occurred : ${err}`
            })
        })
}

//Delete a family
const destroy = (req,res,next)=>{
    console.log('Starting');
    let nodeId = req.body._id
    Node.findByIdAndDelete(nodeId)
        .then(response=>{
            req.json({
                message:'Node Details Deleted Successfully'
            })
        })
        .catch(err=>{
            req.json({
                message:`An error Occurred : ${err}`
            })
        })
}

module.exports = {
    index, show, store, update, destroy
}
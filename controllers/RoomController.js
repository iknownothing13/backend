const Room = require( "../models/Room" );
const mongoose = require("mongoose");
const {Types} = require("mongoose");

//show the list of Families
const index = (req,res,next)=>{
    console.log('Print this');
    Room.find()
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
    let room_id = req.body._id
    Room.findById(room_id)
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
    let roomObj = new Room({
        roomName : req.body.roomName,
        _id   : req.body._id,
        roomIdsArr : req.body.roomIdsArr,
        userIdsPresent : req.body.userIdsPresent,
    })
    roomObj.save()
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
    let roomId = req.body._id
    let updatedRoomData = {
        nodeIdsArr : req.body.nodeIdsArr,
        roomName : req.body.roomName,
        roomIdsArr : req.body.roomIdsArr,
        userIdsPresent : req.body.userIdsPresent,
    }
    Room.findByIdAndUpdate(roomId,{$set:updatedRoomData},)
        .then(response=>{
            res.json({
                message:'Room Details Updated Successfully'
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
    let roomId = req.body._id
    Room.findByIdAndDelete(roomId)
        .then(response=>{
            req.json({
                message:'Room Details Deleted Successfully'
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
const Home = require( "../models/Home" );
const mongoose = require("mongoose");
const {Types} = require("mongoose");

//show the list of Families
const index = (req,res,next)=>{
    console.log('Print this');
    Home.find()
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
    let home_id = req.body._id
    Home.findById(home_id)
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
    let homeObj = new Home({
        homeName : req.body.homeName,
        _id   : req.body._id,
        roomIdsArr : req.body.roomIdsArr,
    })
    homeObj.save()
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
    let homeId = req.body._id
    let updatedHomeData = {
        homeName : req.body.homeName,
        roomIdsArr : req.body.roomIdsArr
    }
    Home.findByIdAndUpdate(homeId,{$set:updatedHomeData},)
        .then(response=>{
            res.json({
                message:'Home Details Updated Successfully'
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
    let homeId = req.body._id
    Home.findByIdAndDelete(homeId)
        .then(response=>{
            req.json({
                message:'Home Details Deleted Successfully'
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
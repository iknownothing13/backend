const Family = require( "../models/Family" );
const mongoose = require("mongoose");
const {Types} = require("mongoose");

//show the list of Families
const index = (req,res,next)=>{
    console.log('Print this');
    Family.find()
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

//login
//show single family details
const login=(req,res,next)=>{
    console.log('Show print is');
    //console.log('Starting');
    let familyName = req.body.familyName
    let password = req.body.password;
    Family.find({familyName: familyName, password: password})
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

//show single family details
const show=(req,res,next)=>{
    console.log('Show print is');
    //console.log('Starting');
    let family_id = req.body._id
    Family.findById(family_id)
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
    let familyObj = new Family({
        familyName : req.body.familyName,
        _id   : req.body._id,
        password   : req.body.password,
        homeIdsArr : req.body.homeIdsArr,
        familyUsersIdsArr : req.body.familyUsersIdsArr
    })
    familyObj.save()
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
    let familyId = req.body._id
    let updatedFamilyData = {
        familyName : req.body.familyName,
        password   : req.body.password,
        homeIdsArr : req.body.homeIdsArr,
        familyUsersIdsArr : req.body.familyUsersIdsArr
    }
    Family.findByIdAndUpdate(familyId,{$set:updatedFamilyData},)
    .then(response=>{
        res.json({
            message:'Family Details Updated Successfully'
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
    let familyId = req.body._id
    Family.findByIdAndDelete(familyId)
    .then(response=>{
        req.json({
            message:'Family Details Deleted Successfully'
        })
    })
    .catch(err=>{
        req.json({
            message:`An error Occurred : ${err}`
        })
    })
}

module.exports = {
    index, show, store, update, destroy, login
}
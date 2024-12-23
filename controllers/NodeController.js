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

const filterByTimestamp = (req, res, next) => {
    console.log('Filtering by timestamps and nodeValue');

    const { start, end, nodeValue } = req.body; // Extract start, end, and nodeValue from the body

    // Validate required fields
    if (!start || !end || !nodeValue) {
        return res.status(400).json({
            message: 'start, end, and nodeValue are required fields in the format dd/mm/yyyy hh:mm:ss'
        });
    }

    // Helper function to parse `dd/mm/yyyy hh:mm:ss` into a Date object
    const parseDateTime = (dateTimeString) => {
        const [datePart, timePart] = dateTimeString.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes, seconds); // Month is 0-indexed
    };

    try {
        // Parse the input dates
        const startDate = parseDateTime(start);
        const endDate = parseDateTime(end);

        // Query to find all documents matching nodeValue and within the date range
        Node.find({
            nodeValue: nodeValue, // Match the nodeValue
            createdAt: { $gte: startDate, $lte: endDate } // Filter by the createdAt range
        })
            .then(response => {
                res.json({
                    data: response // Return all matching documents
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: `An error occurred: ${err}`
                });
            });
    } catch (err) {
        res.status(400).json({
            message: 'Invalid date format. Please use dd/mm/yyyy hh:mm:ss'
        });
    }
};



//Add new Family
// const store=(req,res,next)=>{
//     console.log('Save started');
//     let nodeObj = new Node({
//         activityData : req.body.activityData,
//         _id   : req.body._id,
//         nodeValue:req.body.nodeValue,
//         // predictionArr : req.body.predictionArr,
//         // probabilityArr : req.body.probabilityArr,
//     })
//     nodeObj.save()
//         .then(response=>{
//             res.json({
//                 response
//             })
//         })
//         .catch(err=>{
//             res.json({
//                 message:`An error Occurred : ${err}`
//             })
//         })
// }
const store = (req, res, next) => {
    console.log('Save started');

    // Get the maximum _id or set it to 1 if no data exists
    Node.countDocuments()
        .then(count => {
            let newId = count + 1; // New _id = count of documents + 1
            // Create a new node object with the calculated _id
            let nodeObj = new Node({
                _id: newId, // Set the dynamic _id
                activityData: req.body.activityData,
                nodeValue: req.body.nodeValue,
            });

            // Save the node object to the database
            nodeObj.save()
                .then(response => {
                    res.json({
                        message: 'Node data saved successfully',
                        data: response
                    });
                })
                .catch(err => {
                    res.json({
                        message: `An error occurred: ${err}`
                    });
                });
        })
        .catch(err => {
            res.json({
                message: `An error occurred while counting documents: ${err}`
            });
        });
};

//Update Family Details
const update = (req,res,next)=>{
    console.log('Starting');
    let nodeId = req.body._id
    let updatedRoomData = {
        // activityArr : req.body.activityArr,
        // predictionArr : req.body.predictionArr,
        // probabilityArr : req.body.probabilityArr,
        // timestampArr : req.body.timestampArr,
        activityData : req.body.activityData,
        nodeValue:req.nodeValue,
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
// const destroy = (req,res,next)=>{
//     console.log('Starting');
//     let nodeId = req.body._id
//     Node.findByIdAndDelete(nodeId)
//         .then(response=>{
//             req.json({
//                 message:'Node Details Deleted Successfully'
//             })
//         })
//         .catch(err=>{
//             req.json({
//                 message:`An error Occurred : ${err}`
//             })
//         })
// }
//Soft deleting
const destroy = (req, res, next) => {
    console.log('Starting');
    let nodeId = req.body._id;  // Get the _id of the node to be deleted

    // Update the document's isDeleted field to true
    Node.findByIdAndUpdate(nodeId, { $set: { isDeleted: true } })
        .then(response => {
            if (response) {
                res.json({
                    message: 'Node Details marked as deleted successfully'
                });
            } else {
                res.json({
                    message: 'Node not found'
                });
            }
        })
        .catch(err => {
            res.json({
                message: `An error occurred: ${err}`
            });
        });
};
module.exports = {
    index, show, store, update, destroy, filterByTimestamp
}
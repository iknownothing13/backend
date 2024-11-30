const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const familyRoute = require('./routes/family');
const homeRoute = require('./routes/home');
const roomRoute = require('./routes/room');
const nodeRoute = require('./routes/node');
mongoose.connect('mongodb+srv://praneeth130204:praneeth130204@cluster1.rmcts.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection

db.on('error',(err)=>{
    console.log(err);
})

db.once('open', ()=>{
    console.log('Connected to DataBase');
})

const app = express()
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})

app.use('/api/family',familyRoute)
app.use('/api/home',homeRoute)
app.use('/api/room',roomRoute)
app.use('/api/node',nodeRoute)
'use strict';
require('dotenv').config();
const server = require('./lib/server');
const mongoose = require('mongoose');

let DATABASE_URL = process.env.DATABASE_URL;
// const PORT = 3030 || process.env.PORT
/**
 * mongooseOptions
 */
// const mongooseOptions = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }

// mongoose.connect(DATABASE_URL, mongooseOptions);

const uri = "mongodb+srv://ahmad:hopes2020@cluster0.vagkk.mongodb.net/ahmad?retryWrites=true&w=majority";
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch(err => console.log(err))

server.start()
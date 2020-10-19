'use strict';
const mongoose = require('mongoose');
const users = mongoose.Schema({
    name: { type: String, required: true },
    pass: { type: String, required: true },
    role: { type: String, required: true, enum : ['ADMIN','EDITOR','READER'] }
});

module.exports = mongoose.model('users', users);
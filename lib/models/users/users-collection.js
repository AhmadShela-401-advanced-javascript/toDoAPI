'use strict';

const schema = require('./users-schema');
const Model = require('../mongo-model');

class User extends Model{
    constructor(){
        super(schema);
    }
}

module.exports = new User()
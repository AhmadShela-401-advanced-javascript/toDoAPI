'use strict';

const schema = require('./toDo-schema');
const Model = require('../mongo-model');

class ToDo extends Model{
    constructor(){
        super(schema);
    }
}

module.exports = new ToDo()
/* eslint-disable no-undef */
'use strict';

class Model{
    constructor(schema){
        this.schema = schema;
    }
    create(record){
        let newRecord = new this.schema(record)
        return newRecord.save();
    }
    get(_id){
        let obj = _id ? { _id } : {};
        return this.schema.find(obj)
    }
    getOne(obj) {
        return this.schema.findOne(obj);
    }
    update(_id,record){
        // this.getOne(record).then(user =>{
            // if(user){
                return this.schema.findByIdAndUpdate(_id,record);
            // }else{
                // return false;
            // }
        // })
    }
    delete(_id){
        return this.schema.findByIdAndDelete(_id);
    }
}
module.exports = Model;
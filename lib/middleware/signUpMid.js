'use strict';
const { memoryUsage } = require('process');
const users = require('../models/users/users-collection');
const multiFunctions = require('./multiFunctions');
module.exports = (req, res, next) => {
    try {
        users.getOne({ name: req.body.name }).then(result => {
            if (result) {
                next('already exist', result);
            }
            req.jwt = multiFunctions.getToken(req.body);
            multiFunctions.hash(req.body.pass).then(hashedPass => {
                req.body.pass = hashedPass
                next();
            });
        });
    } catch (error) {
        next('catch error : ', error);
    }
}
'use strict';
const base64 = require('base-64');
const users = require('../models/users/users-collection');
const multiFunctions = require('./multiFunctions');
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        next('missing Headers');
        return;
    }
    const auth = req.headers.authorization.split(' ');
    console.log('Basic Auth activated', auth);
    if (auth[0] == 'Basic') {
        console.log('auth', base64.decode(auth[1]).split(':'));
        // const [name, pass] = base64.decode(auth[1]).split(':');
        const myAuth = base64.decode(auth[1]).split(':');

        console.log('---->myAuth',myAuth);
        var name = myAuth[0];
        var pass = myAuth[1];
        users.getOne({ name }).then(userObj => {
            console.log('user exist', userObj);
            multiFunctions.comparePasswprds(pass, userObj.pass).then(valid => {
                if (!valid) {
                    return next('Wrong username or pass');
                }
                let token = multiFunctions.getToken(userObj);
                if (!token) {
                    return next('SomeThing went wrong');
                }
                req.basicAuth = {
                    token: token,
                    user: userObj
                }
                console.log('valid Pass', valid);
                next();
            })
        }).catch(err => next(err));
    } else if (auth[0] == 'Bearer') {
        let token = auth[1];
        multiFunctions.authoraizeUser(token).then(isUserAuthorize => {
            if (!isUserAuthorize) {
                return next('WrongToken');
            }
            console.log('authoraizeUser', isUserAuthorize);
            // users.getOne()
            req.bearerAuth = {
                token: token,
                user: isUserAuthorize
            }
            next();
        });
    } else {
        console.log('req.headers.authorization', req.headers.authorization);
        return next('Invalid headers');
    }
}
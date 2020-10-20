'use strict';
const express = require('express');
const router = express.Router();
const signUpMid = require('../middleware/signUpMid');
const basicAuth = require('../middleware/basicAuth');
const acl = require('../middleware/acl')

const users = require('../models/users/users-collection');
const toDo = require('../models/toDo/toDo-collection');

router.get('/api/v1/user',basicAuth,acl('users','read'),getAllUsersHandler);
router.post('/api/v1/user/signup',signUpMid,signUpHandler);
router.post('/api/v1/user/signin',basicAuth,signInHandler);
router.put('/api/v1/user/:userId',basicAuth,acl('users','update'),setUserHandler);
router.delete('/api/v1/user/:userId',basicAuth,acl('users','delete'),deleteUserHandler);

// router.get('/api/v1/todoItem',basicAuth,acl('todo','read'),getAllToDoItems);
// router.post('/api/v1/todoItem',basicAuth,acl('todo','create'),addToDoItem);
// router.put('/api/v1/todoItem/:itemId',basicAuth,acl('todo','update'),UpdatetoDoItem);
// router.delete('/api/v1/todoItem/:itemId',basicAuth,acl('todo','delete'),deleteToDoItem);
router.get('/api/v1/todoItem',getAllToDoItems);
router.post('/api/v1/todoItem',addToDoItem);
router.put('/api/v1/todoItem/:itemId',UpdatetoDoItem);
router.delete('/api/v1/todoItem/:itemId',deleteToDoItem);

function getAllToDoItems(req,res,next) {
    try {
        toDo.get().then(result =>{
            let resultObj={
                count:result.length,
                results:result
            }
            res.status(200).send(resultObj)
        })
    } catch (error) {
        next(error)
    }
}

function addToDoItem(req,res,next) {
    try {
        toDo.create(req.body).then(result =>{
            res.status(201).send(result)
        })
        
    } catch (error) {
        next(error)
    }
}

function UpdatetoDoItem(req,res,next) {
    try {
            toDo.update(req.params.itemId,req.body).then(result =>{
                toDo.getOne({_id : req.params.itemId}).then(item =>{
                    res.status(200).send(item)
                })
            });
        
    } catch (error) {
        next(error)
    }
}

function deleteToDoItem(req,res,next) {
    try {
            toDo.delete(req.params.itemId,req.body).then(result =>{
                    res.status(200).send('Done');
            })
        
    } catch (error) {
        next(error)
    }
}

function getAllUsersHandler(req,res,next) {
    users.get().then(result =>{
        res.status(200).json(result)
    }).catch(next)
}

function signUpHandler(req,res,next) {
    users.create(req.body).then(result =>{
        res.status(201).send('Welcome');
    })
}

function signInHandler(req,res,next) {
    if (req.basicAuth) {
        // add the token as cookie 
        res.cookie('token', req.basicAuth.token);
        // add a header
        res.set('token', req.basicAuth.token);

        res.status(200).json(req.basicAuth);
    } else {
        res.status(403).send("invaled login");
    }
}

function setUserHandler(req,res,next) {
                users.update(req.params.id,req.body).then(result =>{
                    if(result){
                        res.status(200).send(result);
                    }else{
                        res.status(200).send('Denied');
                    }
                });
}

function deleteUserHandler(req,res,next) {
        users.delete(req.params.id).then(result =>{
            if(result){
                res.status(200).send('deleted')
            }else{
                res.status(400).send('cant delete it')
            }
        });
}

module.exports = router;
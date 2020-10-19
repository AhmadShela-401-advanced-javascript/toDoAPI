"use strict";
const multiFunctions = require('./multiFunctions');
module.exports = (resource ,action) => {
  return (req, res, next) => {
    console.log('=====>>>>>>',req.bearerAuth);
    try {
      if (multiFunctions.rolesUsers(req.bearerAuth.user.role, resource , action)) {
        next();
      } else {
        res.send("Access Denied! ");
      }
    } catch (e) {
      console.log("invalid Catch", e.message);
      next("Invalid!");
    }
  };
};
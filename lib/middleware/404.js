'use strict';
/**
 * function to handler the 404 error not found
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// GLobal Middleware on the level of my app
function notFoundHandler(req, res) {
  res.status(404).send('404 Not Found');
}
module.exports = notFoundHandler;
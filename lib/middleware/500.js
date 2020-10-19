'use strict';
// we have to have 4 arguments for the error Handler
function errorHandler(err, req, res) {
  console.log('asdasdsad ::::::: errorHandler');
  res.status(500);
  res.json({ error: err });
}
module.exports = errorHandler;
const mongoose = require('mongoose');
const Comments = require('../models/comments');

const sendAllComments = (req,res,next) => {
  Comments.find()
  .then( comments => {
    res.send({comments})
  })
  .catch(err => {
    if(err) next(err);
  })
}

module.exports = {sendAllComments};
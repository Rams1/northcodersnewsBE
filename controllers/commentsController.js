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

const deleteACommentById = (req,res,next) => {
  const {comment_id} = req.params;
  console.log(comment_id) 
  Comments.remove({"_id": comment_id})
  .then((comment) => {
    console.log(`⚠️ comment with id ${comment_id} has been removed! ⚠️`);
    res.statusCode = 202;
    res.send({"comment":comment_id, "message":`Has been successfully removed!`})
  })
  .catch(err => {
    if (err.name === 'CastError') next({ status: 404 })
    else next(err);
  })
}


module.exports = {sendAllComments, deleteACommentById};
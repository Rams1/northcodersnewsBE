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
  Comments.findOne({_id: comment_id})
  .then(comment => {
    console.log(`comment with id ${comment_id} removed!`)
    res.rend({comment})
  })
  .catch(err => {
    if(err) next(err);
  })
}


module.exports = {sendAllComments, deleteACommentById};
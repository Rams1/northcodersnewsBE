const mongoose = require("mongoose");
const Comments = require("../models/comments");

const sendAllComments = (req, res, next) => {
  Comments.find()
    .populate("belongs_to", "title")
    .populate("created_by", "username")
    .then(comments => {
      res.send({ comments });
    })
    .catch(err => {
      if (err.name === "CastError") next({ status: 404 });
      else next(err);
    });
};

const deleteACommentById = (req, res, next) => {
  const { comment_id } = req.params;
  Comments.remove({ _id: comment_id })
    .then(comment => {
      res.statusCode = 202;
      res.send({
        comment: comment_id,
        message: `Has been successfully removed!`
      });
    })
    .catch(err => {
      if (err.name === "CastError") next({ status: 400 });
      else next(err);
    });
};

const incrementCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;
  const increment = vote === "up" ? 1 : vote === "down" ? -1 : 0;
  Comments.findByIdAndUpdate(
    comment_id,
    {
      $inc: { votes: increment }
    },
    { new: true }
  )
    .then(comment => {
      res.statusCode = 202;
      res.send({ comment });
    })
    .catch(err => {
      if (err.name === "CastError") next({ status: 400 });
      else next(err);
    });
};

module.exports = { sendAllComments, deleteACommentById, incrementCommentById };

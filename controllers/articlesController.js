const mongoose = require('mongoose');
const Articles = require('../models/articles');
const Comments = require('../models/comments');

const sendAllArticles = (req,res,next) => {
  Articles.find()
  .then( (articles )=> {
    res.send({articles})
  })
  .catch(err => {
    if(err) next(err);
  })
}

const sendCommentsByArticleId = (req,res,next) => {
  const {article_id} = req.params;
  Comments.find({"belongs_to": article_id})
  .then(comments => {
    res.send({comments})
  })
  .catch(err => {
    if(err.name === 'CastError') next({status: 404})
    else next(err);
  })
}

const sendArticleById = (req,res,next) => {
  const {article_id} = req.params;
  Articles.findOne({"_id": article_id})
  .then(article => {
    res.send({article});
  })
  .catch(err => {
    if(err.name === 'CastError') next({status: 404})
    else next(err);
  })
}

const receiveCommentByArticleById = (req,res,next) => {
  const {article_id} = req.params;
  const {body,created_by} = req.body;
  Comments.create(
    {
      body,
      belongs_to: article_id, 
      created_by,
      created_at: new Date().getTime(),
      votes:0
    })
    .then( comment => {
      console.log(`\nComment posted on Article ${article_id}! 💡`)
      res.statusCode = 201;
      res.send({comment});
    })
    .catch(err => {
      if (err) console.log(err);
    })
}

const incrementArticleVoteCount = (req,res,next) => {
  const {article_id} = req.params;
  const {vote} = req.query;
  if(vote === "up"){
    Articles.findOneAndUpdate({_id: article_id},{$inc: {votes: 1}
    })
    .then(article => {
      console.log(`article ${article_id} has been up voted 👍`)
      res.statusCode = 202;
      res.send({article});
    })
    .catch(err => {
      if(err.name === 'CastError') next({status: 404})
      else next(err);
    }) 
  }else{
    Articles.findOneAndUpdate({_id: article_id},{$inc:{votes: -1}
    })
    .then(article => {
      console.log(`article ${article_id} has been down voted 👎`)
      res.statusCode = 202;
      res.send({article});
    })
    .catch(err => {
      if(err.name === 'CastError') next({status: 404})
      else next(err);
    })
  }
}

module.exports = {
  sendAllArticles,
  sendCommentsByArticleId,
  sendArticleById,
  receiveCommentByArticleById,
  incrementArticleVoteCount
};
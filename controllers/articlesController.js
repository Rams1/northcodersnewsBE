const mongoose = require('mongoose');
const Articles = require('../models/articles');
const Comments = require('../models/comments');

const sendAllArticles = (req,res,next) => {
  Articles.find().lean()
  .then(articles => {
    const arrOfCounts = articles.map(article => {
      return Comments.find({"belongs_to": article._id}).count()
    })
    return Promise.all([articles,...arrOfCounts]);
  })
  .then( ([articles,...arrOfCommentsCounts] )=> {
       articles.forEach( (article,index) => {
         article.commentCount = arrOfCommentsCounts[index];
    })
    res.send({articles})
  })
  .catch(err => {
    if(err.name === 'CastError') next({status: 404})
    else next(err);
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
  .populate('topics','slug')
  .populate('users','username')
  .then((article) => {
    return Promise.all([Comments.find({"belongs_to": article_id}).count(),article])
  })
  .then(([count,article]) => {
    const {votes,_id,title,body,belongs_to,created_by} = article;
    res.send(
      {
        _id,
        title,
        votes,
        body,
        belongs_to,
        created_by,
        commentCount: count 
      })
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
      if(err.name === 'ValidationError') next({status: 400})
      else next(err);
    })
}

const incrementArticleVoteCount = (req,res,next) => {
  const {article_id} = req.params;
  const {vote} = req.query;
  if(vote === "up"){
    Articles.findOneAndUpdate({_id: article_id},{$inc: {votes: 1}
    },{new:true})
    .then(article => {
      console.log(`article ${article_id} has been up voted 👍`)
      res.statusCode = 202;
      res.send({article});
    })
    .catch(err => {
      if(err.name === 'CastError') return next({status: 400})
      else return next(err);
    }) 
  }
  else if(vote === "down"){
    Articles.findOneAndUpdate({_id: article_id},{$inc:{votes: -1}},{new:true}
    )
    .then(article => {
      console.log(`article ${article_id} has been down voted 👎`)
      res.statusCode = 202;
      res.send({article});
    })
    .catch(err => {
      if(err.name === 'CastError') return next({status: 400})
      else return next(err);
    })
  }
  else{
    return next({status: 400}) 
  }
}

module.exports = {
  sendAllArticles,
  sendCommentsByArticleId,
  sendArticleById,
  receiveCommentByArticleById,
  incrementArticleVoteCount
};
const mongoose = require("mongoose");
const Articles = require("../models/articles");
const Comments = require("../models/comments");

const sendAllArticles = (req, res, next) => {
  Articles.find()
    .lean()
    .populate("belongs_to", "slug")
    .populate("created_by", "username")
    .then(articles => {
      const arrOfCounts = articles.map(article => {
        return Comments.find({ belongs_to: article._id }).count();
      });
      return Promise.all([articles, ...arrOfCounts]);
    })
    .then(([articles, ...arrOfCommentsCounts]) => {
      articles.forEach((article, index) => {
        article.commentCount = arrOfCommentsCounts[index];
      });
      res.send({ articles });
    })
    .catch(err => {
      if (err.name === "CastError") next({ status: 400 });
      else next(err);
    });
};

const sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Comments.find({ belongs_to: article_id })
    .populate("belongs_to", "title")
    .populate("created_by", "username")
    .then(comments => {
      res.send({ comments });
    })
    .catch(err => {
      if (err.name === "CastError") next({ status: 400 });
      else next(err);
    });
};

const sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  Articles.findOne({ _id: article_id })
    .populate("belongs_to", "slug")
    .populate("created_by", "username")
    .then(article => {
      return Promise.all([
        Comments.find({ belongs_to: article_id }).count(),
        article
      ]);
    })
    .then(([commentCount, article]) => {
      const { votes, _id, title, body, belongs_to, created_by } = article;
      res.send({
        article: {
          _id,
          title,
          votes,
          body,
          belongs_to,
          created_by,
          commentCount
        }
      });
    })
    .catch(err => {
      if (err.name === "CastError") next({ status: 400 });
      else next(err);
    });
};

const receiveCommentByArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { body, created_by } = req.body;
  Comments.create({
    body,
    belongs_to: article_id,
    created_by,
    created_at: new Date().getTime(),
    votes: 0
  })
    .then(comment => {
      res.statusCode = 201;
      res.send({ comment });
    })
    .catch(err => {
      if (err.name === "ValidationError") next({ status: 400 });
      else next(err);
    });
};

const incrementArticleVoteCount = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;
  const increment = vote === "up" ? 1 : vote === "down" ? -1 : 0;
  Articles.findByIdAndUpdate(
    article_id,
    { $inc: { votes: increment } },
    { new: true }
  )
    .then(article => {
      res.statusCode = 202;
      res.send({ article });
    })
    .catch(err => {
      if (err.name === "CastError") return next({ status: 400 });
      else return next(err);
    });
};

module.exports = {
  sendAllArticles,
  sendCommentsByArticleId,
  sendArticleById,
  receiveCommentByArticleById,
  incrementArticleVoteCount
};

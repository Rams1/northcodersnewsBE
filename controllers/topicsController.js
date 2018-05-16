const mongoose = require("mongoose");
const Topics = require("../models/topics");
const Articles = require("../models/articles");

const sendAllTopics = (req, res, next) => {
  Topics.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(err => {
      if (err) next(err);
    });
};

const sendArticlesByTopicId = (req, res, next) => {
  const { topic_id } = req.params;
  Articles.find({ belongs_to: topic_id })
    .then(articles => {
      res.send({ articles });
    })
    .catch(err => {
      if (err.name === "CastError") next({ status: 404 });
      else next(err);
    });
};
const receiveArticleByTopicId = (req, res, next) => {
  const { topic_id } = req.params;
  const { title, body, topic, created_by } = req.body;
  Articles.create({
    title,
    body,
    belongs_to: topic_id,
    votes: 0,
    created_by
  })
    .then(article => {
      res.statusCode = 201;
      res.send({ article });
    })
    .catch(err => {
      if (err.name === "ValidationError") next({ status: 400 });
      else next(err);
    });
};

module.exports = {
  sendAllTopics,
  sendArticlesByTopicId,
  receiveArticleByTopicId
};

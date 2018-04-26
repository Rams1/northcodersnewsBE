const seedDB = require('./seed');
const mongoose = require('mongoose');
const articles = require('./devData/articles.json');
const topics = require('./devData/topics.json');
const users = require('./devData/users.json');
const DB_URL = require('../config');

mongoose
  .connect(DB_URL)
  .then(() => seedDB(articles,topics,users))
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.log(err);
  })


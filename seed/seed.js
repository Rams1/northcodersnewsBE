const mongoose = require('mongoose');
const faker = require('faker');
const {Users,Articles,Comments,Topics} = require('../models');
const {formatArticles,refObjOfIdsAndSlug,refObjOfIdsAndNames,arrOfUsernames,arrOfArticleDocs,createComments,commentCreator} = require('../utils');

const seedDB = (articlesData,topicsData,usersData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      console.log(`\n⚓ Database Dropped ⚓\n`);
      return Promise.all(
        [Topics.insertMany(topicsData),
          Users.insertMany(usersData)
        ]);
    })
    .then(([topicDocs,userDocs]) => {
      console.log(`Topics added: ${topicDocs.length} 👌`);
      console.log(`Users added: ${userDocs.length} 👌`);
      const formattedTopic = refObjOfIdsAndSlug(topicDocs);
      //const usernames = arrOfUsernames(userDocs);
      const formattedusers = refObjOfIdsAndNames(userDocs);
      const formattedArticle = formatArticles(articlesData,formattedTopic,userDocs);
        return Promise.all(
          [topicDocs,
            userDocs,
            Articles.insertMany(formattedArticle)
          ])
    })
    .then(([topicDocs,userDocs,articleDocs]) => {
      console.log(`Articles added: ${articleDocs.length} 👌`);
      const env = process.env.NODE_ENV;
      const commentsArr = env === 'test' ? createComments(userDocs,articleDocs,6):createComments(userDocs,articleDocs,340);
       return Promise.all([topicDocs,userDocs,articleDocs,Comments.insertMany(commentsArr)]);
    })
    .then(([topicDocs,userDocs,articleDocs,commentDocs]) => {
      console.log(`Comments added: ${commentDocs.length} 👌`);
      return[topicDocs,userDocs,articleDocs,commentDocs]
    })
    
}

module.exports = seedDB;
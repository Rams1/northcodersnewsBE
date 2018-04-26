const { sample, random } = require('lodash');
const faker = require('faker');


// returns a formatted articles array

exports.formatArticles = (articleData, topicDocs, userDocs) => {
  return articleData.map(article => {
    const env = process.env.NODE_ENV
    const votes = env === 'test' ? 5 : random(-50, 300 )
    const created_by = env === 'test' ? userDocs[0]._id : sample(userDocs)._id;
    const { title, body, topic } = article;
    const belongs_to = topicDocs[topic];
    return { title, body, belongs_to, votes, created_by };
  })
}

// returns an object containing key slug: value id

exports.refObjOfIdsAndSlug = (topicDocs) => {
  return topicDocs.reduce((acc, doc, index) => {
    acc[doc.slug] = doc._id;
    return acc;
  }, {})
}


exports.refObjOfIdsAndNames = (userDocs) => {
  return userDocs.reduce((acc, doc, index) => {
    acc[doc.username] = doc._id;
    return acc;
  }, {})
}

exports.createComments = (userDocs, articleDocs, length) => {
  if(process.env.NODE_ENV === 'test'){
    return Array.from({ length }, () => {
      return {
        body: "hello my name is Slim Shady",
        votes: 6,
        belongs_to: articleDocs[0]._id,
        created_by: userDocs[0]._id
      }
    })
  }else{
    return Array.from({ length }, () => {
      return {
        body: faker.lorem.sentences(),
        votes: random(-5, 15 ),
        belongs_to: sample(articleDocs)._id,
        created_by: sample(userDocs)._id
      }
    })
  }
}

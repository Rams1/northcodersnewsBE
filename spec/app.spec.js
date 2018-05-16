const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const articleData = require('../seed/testData/articles.json');
const topicData = require('../seed/testData/topics.json');
const userData = require('../seed/testData/users.json');



describe('/api', () => {
  let topicDocs, userDocs, articleDocs, commentDocs;
  beforeEach(() => {
    return seedDB(articleData, topicData, userData).then((data) => {
      [topicDocs, userDocs, articleDocs, commentDocs] = data;
    })
  })
  after(() => mongoose.disconnect())
  describe('/topics 🎓', () => {
    it('Topics should be an array, its length should be 2 and topics[0].title should be Mitch string.', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).to.be.an('array');
          expect(topics.length).to.equal(2);
          expect(topics[0].title).to.equal('Mitch');
        });
    });
    it('Should return an array of articles requested by topic id.', () => {
      return request
        .get(`/api/topics/${topicDocs[0]._id}/articles`)
        .expect(200)
        .then(({ body: { articles } }) => {
          console.log(articles)
          expect(articles).to.be.an('array');
          expect(articles.length).to.equal(2);
          expect(articles[0].title).to.equal('Living in the shadow of a great man');
          expect(articles[1].body).to.equal(`Who are we kidding, there is only one, and it's Mitch!`);
        });
    });
    it.only('Should return an article object of the accepted post.', () => {
      return request
        .post(`/api/topics/${topicDocs[0]._id}/articles`)
        .expect(201)
        .send({
               "title": "cheese cake",
               "body": "I love eating cheese cake !!!!!!",
               "topic": "mitch",
               "created_by": "5ae1fccfa93dd8c9db5a7953"
              })
        .then(({ body: { article } }) => {
          expect(article.title).to.equal("cheese cake");
        });
    });
  });
  describe('/users 👤', () => {
    it('Should be an array, its length should be 2 and users[0] should have a prop of username and value of butter_bridge ', () => {
      return request
        .get('/api/Users')
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).to.be.an('array');
          expect(users.length).to.equal(2);
          expect(users[0].username).to.equal("butter_bridge");
        });
    });
    it('Should return a user, requested by their id. ', () => {
      return request
        .get(`/api/Users/${userDocs[0]._id}`)
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user._id).to.equal(`${userDocs[0]._id}`)
        });
    });
  });
  describe('/comments 🗒️', () => {
    it('Should be an array, its length should be 6 and comments 0.body should contain a string. ', () => {
      return request
        .get('/api/comments')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).to.be.an('array');
          expect(comments.length).to.equal(6);
          expect(comments[0].body).to.equal("hello my name is Slim Shady");
        });
    });
    it('Should be 404 on an invalid endpoint. ', () => {
      return request
        .get('/api/comment')
        .expect(404)
    });
    it('Should return an article object of the accepted post.', () => {
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(201)
        .send(
          {
          "body": "I love eating cheese cake !!!!!!",
          "created_by": "5ae1fa785bd819c8147143ad"
          }
        )
        .then(({ body: { comment } }) => {
          expect(comment.body).to.equal("I love eating cheese cake !!!!!!");
          expect(comment.belongs_to).to.equal(`${articleDocs[0]._id}`);
        });
    });
    it('Should be 400 on an invalid request. ', () => {
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(400)
        .send({
          bo: "I love eating cheese cake !!!!!!",
          "created_by": "5ae1fa785bd819c8147143ad"
          })
    });
    it('Should delete a comment by comment id', () => {
        return request
        .delete(`/api/comments/${commentDocs[0]._id}`)
        .expect(202)
        .then(({body: { comment } }) => {
          expect(comment).to.equal(`${commentDocs[0]._id}`);
        });
    });
    it('Should be 404 on an invalid endpoint. ', () => {
      return request
        .delete(`/api/articles/450982908`)
        .expect(404)
    });
    it('Should be 404 on an invalid endpoint. ', () => {
      return request
        .get(`/api/comments/450984905`)
        .expect(404)
    });
    it('should increment comment vote count', () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(202)
        .then(({ body: { comment } }) => {
          expect(comment.votes).to.equal(7);
          //equal(commentDocs[0].votes + 1)
        });
    });
    it('should decrement comment vote count', () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=down`)
        .expect(202)
        .then(({ body: { comment } }) => {
          expect(comment.votes).to.equal(5);
        });
    });
  });
  describe('/articles 📖', () => {
    it('Should return an array with length 4, and array[0].title should be a string.', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.an('array');
          expect(articles.length).to.equal(4);
          expect(articles[0].title).to.equal('Living in the shadow of a great man');
        });
    });
    it('Should return an article requested by id.', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(({ body: { article } }) => {
          console.log(article)
          expect(article._id).to.equal(`${articleDocs[0]._id}`);
          expect(article.commentCount).to.equal(6);
        });
    });
    it('should return comments related to a specific article', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments.length).to.equal(6);
          expect(comments[0].belongs_to).to.equal(`${articleDocs[0]._id}`);
          expect(comments[1].belongs_to).to.equal(`${articleDocs[0]._id}`);
          expect(comments[5].belongs_to).to.equal(`${articleDocs[0]._id}`);

        });
    });
    it('should increment article vote count', () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(202)
        .then(({ body: { article } }) => {
          expect(article.votes).to.equal(6);
        });
    });
    it('should decrement article vote count', () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(202)
        .then(({ body: { article } }) => {
          expect(article.votes).to.equal(4);
        });
    });
    it('Should be status code 400 on an invalid request. ', () => {
      // change test to show gibberish is ignored, only up and down is processed. 
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=sr`)
        .expect(400)
    });
  });
});

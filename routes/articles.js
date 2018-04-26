const router = require('express').Router();
const {
       sendAllArticles,
       sendCommentsByArticleId,
       sendArticleById,
       receiveCommentByArticleById
      } = require('../controllers/articlesController');


      
router.get('/', sendAllArticles);
router.get('/:article_id/comments', sendCommentsByArticleId);
router.get('/:article_id', sendArticleById);
router.post('/:article_id/comments', receiveCommentByArticleById);

module.exports = router;
const router = require('express').Router();
const {
       sendAllArticles,
       sendCommentsByArticleId,
       sendArticleById,
       receiveCommentByArticleById,
       incrementArticleVoteCount
      } = require('../controllers/articlesController');


      
router.get('/', sendAllArticles);
router.get('/:article_id/comments', sendCommentsByArticleId);
router.get('/:article_id', sendArticleById);
router.post('/:article_id/comments', receiveCommentByArticleById);
router.put('/:article_id', incrementArticleVoteCount);

module.exports = router;
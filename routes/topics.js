const router = require('express').Router();
const { sendAllTopics, sendArticlesByTopicId, receiveArticleByTopicId } = require('../controllers/topicsController');

router.get('/', sendAllTopics);
router.get('/:topic_id/articles', sendArticlesByTopicId);
router.post('/:topic_id/articles', receiveArticleByTopicId);

module.exports = router;
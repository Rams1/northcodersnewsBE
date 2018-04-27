const router = require('express').Router();
const {sendAllComments, deleteACommentById} = require('../controllers/commentsController');

router.get('/', sendAllComments);
router.get('/:comment_id', deleteACommentById);

module.exports = router;
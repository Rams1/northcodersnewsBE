const router = require('express').Router();
const {sendAllComments, deleteACommentById} = require('../controllers/commentsController');

router.get('/', sendAllComments);
router.delete('/:comment_id', deleteACommentById);

module.exports = router;
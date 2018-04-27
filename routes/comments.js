const router = require('express').Router();
const {sendAllComments, deleteACommentById, incrementCommentById} = require('../controllers/commentsController');

router.get('/', sendAllComments);
router.delete('/:comment_id', deleteACommentById);
router.put('/:comment_id', incrementCommentById);

module.exports = router;
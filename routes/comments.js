const router = require('express').Router();
const {sendAllComments} = require('../controllers/commentsController');

router.get('/', sendAllComments);

module.exports = router;
const router = require('express').Router();
const {sendAllUsers,sendUserById} = require('../controllers/usersController');

router.get('/', sendAllUsers);
router.get('/:user_id', sendUserById);

module.exports = router;
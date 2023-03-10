const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login',userController.login);
router.get('/:id',userController.showUserId);
module.exports = router;
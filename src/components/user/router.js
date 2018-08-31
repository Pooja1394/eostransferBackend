/**
 * User routes
 */
const express = require('express');
const router = express.Router();
const userController = require('./controller');

router.post('/nameAlreadyExist', userController.nameAlreadyExist);
router.get('/getPayAmount', userController.getPayAmount);
router.post('/createAccount', userController.createAccount);



module.exports = router;
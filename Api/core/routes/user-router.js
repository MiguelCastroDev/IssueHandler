'use strict'

const express = require('express');
const getUsersList = require('../controllers/user/get-users-list-controller');
const getUser = require('../controllers/user/get-user-controller');

const router = express.Router();

//GET REQUEST
router.get('/user', getUsersList);
router.get('/user/:id', getUser);

//POST REQUEST

//PUT REQUEST

module.exports = router;
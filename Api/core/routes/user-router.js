'use strict'

const express = require('express');
const getUsersList = require('../controllers/user/get-users-list-controller');

const router = express.Router();

router.get('/user', getUsersList);

module.exports = router;
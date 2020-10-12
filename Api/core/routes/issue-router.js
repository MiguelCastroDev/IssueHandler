'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getIssuesList = require('../controllers/user/get-issues-list-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/issue', getIssuesList);

//POST REQUEST

//PUT REQUEST

module.exports = router;
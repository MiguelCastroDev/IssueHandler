'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getIssuesList = require('../controllers/issue/get-issues-list-controller');
const getIssue = require('../controllers/issue/get-issue-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/issue', getIssuesList);
router.get('/issue/:id', getIssue);

//POST REQUEST

//PUT REQUEST

module.exports = router;
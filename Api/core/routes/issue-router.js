'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getIssuesList = require('../controllers/issue/get-issues-list-controller');
const getIssue = require('../controllers/issue/get-issue-controller');
const addIssue = require('../controllers/issue/add-issue-controller');
const modifyIssue = require('../controllers/issue/modify-issue-controller');
const deleteIssue = require('../controllers/issue/delete-issue-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/issue', getIssuesList);
router.get('/issue/:id', getIssue);

//POST REQUEST
router.post('/issue/add', addIssue);
router.post('/issue/modify', modifyIssue);

//PUT REQUEST
//Se mantendra datos del usuario para mantener trazabilidad
router.put('/ISSUE/delete/:id', deleteIssue);

module.exports = router;
'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getProject = require('../controllers/project/get-project-controller');
const getProjects = require('../controllers/project/get-project-list-controller');
const addProject = require('../controllers/project/add-project-controller');
const modifyProject = require('../controllers/project/modify-project-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/project', getProjects);
router.get('/project/:id', getProject);

//POST REQUEST
router.post('/project/add', addProject)
router.post('/project/modify', modifyProject)

//DELETE REQUEST

module.exports = router;
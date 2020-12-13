'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getProject = require('../controllers/project/get-project-controller');
const getProjects = require('../controllers/project/get-project-list-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/project', getProjects);
router.get('/project/:id', getProject);

//POST REQUEST

//DELETE REQUEST

module.exports = router;
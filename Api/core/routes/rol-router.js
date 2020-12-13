'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getRoles = require('../controllers/rol/get-roles-controller');
const getRol = require('../controllers/rol/get-rol-controller');
const addRol = require('../controllers/rol/add-rol-controller');
const modifyRol = require('../controllers/rol/modify-rol-controller');
const deleteRol = require('../controllers/rol/delete-rol-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/rol/:id', getRol);
router.get('/rol', getRoles);

//POST REQUEST
router.post('/rol/add', addRol);
router.post('/rol/modify', modifyRol);

//DELETE REQUEST
router.delete('/rol/delete/:id', deleteRol);

module.exports = router;
'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getUsersList = require('../controllers/user/get-users-list-controller');
const getUser = require('../controllers/user/get-user-controller');

const addUser = require('../controllers/user/add-user-controller');
const getLoggedUser = require('../controllers/user/get-logged-user-controller');

const modifyUser = require('../controllers/user/modify-user-controller');
const deleteUser = require('../controllers/user/modify-user-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/user', getUsersList);
router.get('/user/:id', getUser);

//POST REQUEST
router.post('/user/add', addUser);
router.post('/user/login', getLoggedUser);

//PUT REQUEST
router.put('/user/modify', modifyUser);
//Delete es una petición dado que solo se modificara el estado de activo
//Se mantendra datos del usuario para mantener trazabilidad
router.put('/user/delete', deleteUser);

module.exports = router;
'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getUsersList = require('../controllers/user/get-users-list-controller');
const getUser = require('../controllers/user/get-user-controller');

const addUser = require('../controllers/user/add-user-controller');
const getLoggedUser = require('../controllers/user/get-logged-user-controller');

const modifyUser = require('../controllers/user/modify-user-controller');
const deleteUser = require('../controllers/user/delete-user-controller');
const changeUserPassword = require('../controllers/user/change-user-password-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/user', getUsersList);
router.get('/user/:id', getUser);

//POST REQUEST
router.post('/user/add', addUser);
router.post('/user/login', getLoggedUser);
router.post('/user/modify', modifyUser);
router.post('/user/password/change', changeUserPassword);

//PUT REQUEST
//Delete es una petición dado que solo se modificara el estado de activo
//Se mantendra datos del usuario para mantener trazabilidad
router.put('/user/delete/:id', deleteUser);

module.exports = router;
'use strict'

const express = require('express');
const router = express.Router();

//Controllers functions
const getRoles = require('../controllers/rol/get-roles-controller');

////////
//Routes
////////

//GET REQUEST
router.get('/rol', getRoles);

//POST REQUEST

//PUT REQUEST
//Se mantendra datos del usuario para mantener trazabilidad

module.exports = router;
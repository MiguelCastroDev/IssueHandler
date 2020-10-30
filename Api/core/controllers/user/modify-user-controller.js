'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Modifica un usuario a la base de datos
 * @param {*} req Datos a actualizar de usuario
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function modifyUser(req, res, next){
    
}

module.exports = modifyUser;
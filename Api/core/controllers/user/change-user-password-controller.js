'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');

/**
 * Cambia la contraseña de un usuario
 * @param {*} req 
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function changeUserPassword(req, res, next){
    
}

module.exports = changeUserPassword;
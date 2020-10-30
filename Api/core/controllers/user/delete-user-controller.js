'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Id de usuario el cual se DESACTIVARA, no realizamos una eliminación real para mantener
 * una trazabilidad
 * @param {*} req Id del usuario a desactivar
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function deleteUser(req, res, next){
    
}

module.exports = deleteUser;
'use strict'

const mysqlPool = require('../../utils/db-pool');
const bcrypt = require('bcrypt');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Modifica una incidencia en la base de datos
 * @param {*} req Datos a actualizar de usuario
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function modifyIssue(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    res.status(result.status).send(result.message);
}

module.exports = modifyIssue;
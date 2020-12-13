'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Añade un rol a la base de datos
 * @param {*} req Datos del nuevo rol
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function addRol(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const {name, description} = {...req.body};

    const query = `INSERT INTO roles (name, description) VALUES (? , ?)`;

    logger.info(`>Add rol:${name}`);

    if (!name || !description)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();
            const insertion = await connection.query(query, [name, description]);
            connection.release();
            if (insertion[0].affectedRows > 0) {
                logger.info(`>>>${name} add succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.ROLES.ADDROLUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${name} add error`);
            result = getMessage(400, MESSAGES.ERROR.ROLES.ADDROLERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = addRol;
'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Añade un proyecto a la base de datos
 * @param {*} req Datos del nuevo proyecto
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function addProject(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const {name, description} = {...req.body};

    const query = `INSERT INTO projects (name, description) VALUES (?, ?)`;

    logger.info(`>Add project:${name}`);

    if (!name)
    {
        result = getMessage(400, MESSAGES.ERROR.PROJECT.ADDPROJECTERRORTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();

            const insertion = await connection.query(query, [name, description]);
            connection.release();
            if (insertion[0].affectedRows > 0) {
                logger.info(`>>>${name} add succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.PROJECT.ADDPROJECTSUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${name} add error`);
            result = getMessage(400, MESSAGES.ERROR.PROJECT.ADDPROJECTERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = addProject;
'use strict'

const mysqlPool = require('../../utils/db-pool');
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

    const {id, title, description, type, level} = {...req.body};

    const query = `UPDATE issues SET title = ?, description = ?, type = ?, level = ? WHERE id = ?`;

    logger.info(`>Modify issue:${id}`);

    //Si todos los parametros modificables son null O el id no existe
    if ((!title && !description && !type && !level) || !id)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();

            const updatedIssue = await connection.query(query, [title, description, type, level, id]);
            connection.release();
            if (updatedIssue[0].affectedRows > 0) {
                logger.info(`>>>${id} modify succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.ISSUE.MODIFYISSUESUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${id} modify error`);
            result = getMessage(400, MESSAGES.ERROR.ISSUE.REMOVEISSUEERRORTEXT);
        }
    }

    res.status(result.status).send(result.message);
}

module.exports = modifyIssue;
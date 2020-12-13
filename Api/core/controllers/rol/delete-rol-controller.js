'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Id del rol a eliminar
 * @param {*} req Id del rol a eliminar
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function deleteRol(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const id = req.params.id;

    const query = `DELETE from ROLES WHERE id = ?`;

    logger.info(`>Delete rol:${id}`);

    //Si no se adjunta id
    if (!id)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();

            const deleteRol = await connection.query(query, [id]);
            connection.release();
            if (deleteRol[0].affectedRows > 0) {
                logger.info(`>>>${id} delete succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.ROLES.REMOVEROLSUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${id} remove error`);
            result = getMessage(400, MESSAGES.ERROR.ROLES.REMOVEROLERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = deleteRol;
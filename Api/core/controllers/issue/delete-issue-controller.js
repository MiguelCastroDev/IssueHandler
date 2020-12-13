'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Id de incidente el cual se DESACTIVARA, no realizamos una eliminación real para mantener
 * una trazabilidad
 * @param {*} req Id del incidente a desactivar
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function deleteIssue(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const id = req.params.id;
    const endDate = new Date().toLocaleString();

    const query = `UPDATE issues SET deactive_date = ? WHERE id = ?`;

    logger.info(`>Delete/Deactive incidente:${id}`);

    //Si no se adjunta id
    if (!id)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();

            const deactiveIssue = await connection.query(query, [endDate, id]);
            connection.release();
            if (deactiveIssue[0].affectedRows > 0) {
                logger.info(`>>>${id} delete/deactive succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.ISSUE.REMOVEISSUESUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${id} remove error`);
            result = getMessage(400, MESSAGES.ERROR.ISSUE.REMOVEISSUEERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = deleteIssue;
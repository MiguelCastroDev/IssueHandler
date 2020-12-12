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
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const id = req.params.id;
    const endDate = new Date().toLocaleString();

    const query = `UPDATE users SET deactive_date = ? WHERE id = ?`;

    logger.info(`>Delete/Deactive user:${id}`);

    //Si no se adjunta id
    if (!id)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();

            const deactiveUser = await connection.query(query, [endDate, id]);
            connection.release();
            if (deactiveUser[0].affectedRows > 0) {
                logger.info(`>>>${id} delete/deactive succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.USER.REMOVEUSERSUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${id} remove error`);
            result = getMessage(400, MESSAGES.ERROR.USER.REMOVEUSERERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = deleteUser;
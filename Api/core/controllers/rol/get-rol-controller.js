'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Obtiene un rol por su id
 * @param {*} req 
 * @param {*} res rOL
 * @param {*} next 
 */
async function getRol(req, res, next){
    let rol = null;
    const param = req.params.id;
    const query = 'SELECT * FROM roles WHERE id = ?';

    logger.info(`>Get rol id :${param}`);

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query(query, [param]);
        connection.release();
        rol = result[0];

        if ((rol!=null) && (rol.length == 1)) {
            logger.info(`>>>${param}: exist`);
            res.status(200).send(rol[0]);
        } else {
            logger.info(`>>>${param} does not exist`);
            result = getMessage(404, MESSAGES.ERROR.ROLES.GETROLERRORTEXT);
        }
    } catch(e){
        logger.info(`>>>>getRol: error`);
        res.status(404).send(e);
    }
}

module.exports = getRol;
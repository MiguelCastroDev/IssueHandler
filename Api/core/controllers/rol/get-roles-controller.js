'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Obtiene el listado de roles
 * @param {*} req 
 * @param {*} res Array con el listado de roles
 * @param {*} next 
 */
async function getRoles(req, res, next){
    let rolestList = null;
    logger.info(`>Get roles`);

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query('SELECT * FROM roles');
        connection.release();
        rolestList = result[0];

        if (rolestList!=null && (rolestList.length > 0)) {
            logger.info(`>>>Get getRoles successfully`);
            res.status(200).send(rolestList);
        } else {
            logger.info(`>>>Roles empty`);
            res.status(404).send('No se han encontrado roles registradas');
        }
    } catch(e){
        logger.info(`>>>>getRoles: error`);
        res.status(404).send(e);
    }
}

module.exports = getRoles;
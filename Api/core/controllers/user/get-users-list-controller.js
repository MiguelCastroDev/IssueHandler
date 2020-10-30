'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Obtiene el listado de usuarios
 * @param {*} req 
 * @param {*} res Array con el listado de usuarios
 * @param {*} next 
 */
async function getUsersList(req, res, next){
    let userList = null;
    logger.info(`>Get user list`);

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query('SELECT * FROM users');
        connection.release();
        userList = result[0];

        if (userList!=null) {
            logger.info(`>>>Get user list successfully`);
            res.status(200).send(userList);
        } else {
            logger.info(`>>>${email} is not registered`);
                result = getMessage(404, MESSAGES.ERROR.USER.GETUSERSLISTERRORTEXT);
        }
    } catch(e){
        logger.info(`>>>>getUsersList: error`);
        res.status(404).send(e);
    }
}

module.exports = getUsersList;
'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Obtiene un usuario por su id
 * @param {*} req 
 * @param {*} res Usuario
 * @param {*} next 
 */
async function getUser(req, res, next){
    let user = null;
    const param = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';

    logger.info(`>Get user id :${param}`);

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query(query, [param]);
        connection.release();
        user = result[0];

        if ((user!=null) && (user.length == 1)) {
            logger.info(`>>>${param}: exist`);
            res.status(200).send(user[0]);
        } else {
            logger.info(`>>>${param} does not exist`);
            result = getMessage(404, MESSAGES.ERROR.USER.GETUSERERRORTEXT);
        }
    } catch(e){
        logger.info(`>>>>getUser: error`);
        res.status(404).send(e);
    }
}

module.exports = getUser;
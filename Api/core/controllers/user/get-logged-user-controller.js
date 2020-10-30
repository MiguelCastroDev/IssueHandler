'use strict'

const mysqlPool = require('../../utils/db-pool');
const bcrypt = require('bcrypt');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Busca un usuario por su email, y a continuación comprueba si su password coincide
 * @param {*} req 
 * @param {*} res Usuario
 * @param {*} next 
 */
async function getLoggedUserController(req, res, next){
    
    let user = null;
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);
    const {email, password} = {...req.body};
    const query = 'SELECT * FROM users WHERE email = ?';
    
    logger.info(`>Check password to user:${email}`);

    if (email != null & password != null) {
        try{
            const connection = await mysqlPool.getConnection();
            const result = await connection.query(query, [email]);
            connection.release();
            user = result[0];

            if ((user!=null)) {
                if (await bcrypt.compare(password,user[0].password)) {
                    result = getMessage(200, MESSAGES.SUCCESS.USER.GETUSERSUCCESSTEXT);
                    //Devolvemos el objeto usuario sin password
                    user[0].password = '';
                    logger.info(`>>>${email} success logged`);
                    res.status(200).send(user[0]);
                }
                else {
                    logger.info(`>>>${email} wrong password`);
                    result = getMessage(401, MESSAGES.ERROR.PASSWORD.WRONGPASSWORDTEXT);
                }
            } else {
                logger.info(`>>>${email} is not registered`);
                result = getMessage(404, MESSAGES.ERROR.USER.GETUSERWITHEMAILERRORTEXT);
            }
        } catch(e){
            logger.info(`>>>getLoggedUserController: error`);
            res.status(404).send(e);
        }
    } else {
        logger.info(`>>>Incorrect parameters`);
        result = getMessage(400, MESSAGES.ERROR.DEFAULT.INCORRECTPARAMETERSTEXT);
    }

    res.status(result.status).send(result.message);
}

module.exports = getLoggedUserController;
'use strict'

const mysqlPool = require('../../utils/db-pool');
const bcrypt = require('bcrypt');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Añade un usuario a la base de datos
 * @param {*} req Datos del nuevo usuario
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function addUser(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const {user, email, password} = {...req.body};
    const defaultRol = 0;

    const query = `INSERT INTO users (user, email, password, rol) VALUES (? , ? , ?, ${defaultRol})`;

    logger.info(`>Add user:${user}`);

    if (!user || !email || !password)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();
            let hashPassword = await bcrypt.hash(password, 10);
            const insertion = await connection.query(query, [user, email, hashPassword]);
            connection.release();
            if (insertion[0].affectedRows > 0) {
                logger.info(`>>>${user} add succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.USER.ADDUSERSUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${user} add error`);
            result = getMessage(400, MESSAGES.ERROR.USER.ADDUSERERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = addUser;
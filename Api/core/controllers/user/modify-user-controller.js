'use strict'

const mysqlPool = require('../../utils/db-pool');
const bcrypt = require('bcrypt');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Modifica un usuario a la base de datos
 * @param {*} req Datos a actualizar de usuario
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function modifyUser(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const {id, user, email, password} = {...req.body};

    const query = `UPDATE users SET user = ?, email = ?, password = ? WHERE id = ?`;

    logger.info(`>Add user:${user}`);

    //Si todos los parametros modificables son null O el id no existe
    if ((!user && !email && !password) || !id)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();
            let hashPassword = null;

            if (password)
                hashPassword = await bcrypt.hash(password, 10);

            const updatedUser = await connection.query(query, [user, email, hashPassword, id]);
            connection.release();
            if (updatedUser[0].affectedRows > 0) {
                logger.info(`>>>${user} modify succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.USER.MODIFYUSERSUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${user} modify error`);
            result = getMessage(400, MESSAGES.ERROR.USER.MODIFYUSERERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = modifyUser;
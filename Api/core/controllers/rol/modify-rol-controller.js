'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Modifica un usuario a la base de datos
 * @param {*} req Datos a actualizar de usuario
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function modifyRol(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const {id, name, description} = {...req.body};

    const query = `UPDATE roles SET name = ?, description = ? WHERE id = ?`;

    logger.info(`>Modify rol: ${id}`);

    //Si todos los parametros modificables son null O el id no existe
    if ((!name && !description) || !id)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();

            const updatedRol = await connection.query(query, [name, description, id]);
            connection.release();
            if (updatedRol[0].affectedRows > 0) {
                logger.info(`>>>${id} modify succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.ROLES.MODIFYROLSUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${id} modify error`);
            result = getMessage(400, MESSAGES.ERROR.ROLES.MODIFYROLERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = modifyRol;
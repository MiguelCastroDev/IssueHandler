'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Modifica un proyecto a la base de datos
 * @param {*} req Datos a actualizar de un proyecto
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function modifyProject(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const {id, name, description} = {...req.body};

    const query = `UPDATE projects SET name = ?, description = ? WHERE id = ?`;

    logger.info(`>Modify project: ${id}`);

    //Si todos los parametros modificables son null O el id no existe
    if ((!name && !description) || !id)
    {
        result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
    } else {
        try {
            let connection = await mysqlPool.getConnection();

            const updatedProject = await connection.query(query, [name, description, id]);
            connection.release();
            if (updatedProject[0].affectedRows > 0) {
                logger.info(`>>>${id} modify succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.PROJECT.MODIFYPROJECTSUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${id} modify error`);
            result = getMessage(400, MESSAGES.ERROR.PROJECT.MODIFYPROJECTERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = modifyProject;
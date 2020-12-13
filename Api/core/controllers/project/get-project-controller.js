'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');

/**
 * Obtiene un proyecto por su id
 * @param {*} req 
 * @param {*} res Proyecto
 * @param {*} next 
 */
async function getProject(req, res, next){
    let project = null;
    const param = req.params.id;
    const query = 'SELECT * FROM projects WHERE id = ?';

    logger.info(`>Get project id :${param}`);

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query(query, [param]);
        connection.release();
        project = result[0];

        if ((project!=null) && (project.length == 1)) {
            logger.info(`>>>${param}: exist`);
            res.status(200).send(project[0]);
        } else {
            logger.info(`>>>${param} does not exist`);
            res.status(404).send(MESSAGES.ERROR.PROJECT.GETPROJECTERRORTEXT);
        }
    } catch(e){
        logger.info(`>>>>getProyect: error`);
        res.status(404).send(e);
    }
}

module.exports = getProject;
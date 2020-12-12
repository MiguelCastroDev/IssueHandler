'use strict'

const mysqlPool = require('../../utils/db-pool');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const logger = require('../../utils/logger');
const defaultValues = require('../../utils/default-values');

/**
 * Añade una incidencia a la base de datos
 * @param {*} req Datos de la nueva incidencia
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function addIssue(req, res, next){
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    const {title, description, author, type, levelReq} = {...req.body};

    const query = `INSERT INTO issues (title, description, author, type, level) VALUES (?, ?, ?, ?, ?)`;

    logger.info(`>Add issue:${title}`);

    if (!title || !author || !type)
    {
        result = getMessage(400, MESSAGES.ERROR.ISSUE.ADDISSUEERRORTEXT);
    } else {
        try {
            let level = defaultValues.VALUES.ISSUE_TYPE;
            let connection = await mysqlPool.getConnection();
            if ((levelReq!='') && (levelReq!=undefined))
                level = levelReq;
            const insertion = await connection.query(query, [title, description, author, type, level]);
            connection.release();
            if (insertion[0].affectedRows > 0) {
                logger.info(`>>>${title} add succesfully`);
                result = getMessage(201, MESSAGES.SUCCESS.ISSUE.ADDISSUEUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${title} add error`);
            result = getMessage(400, MESSAGES.ERROR.ISSUE.ADDISSUEERRORTEXT);
        }
    }
    res.status(result.status).send(result.message);
}

module.exports = addIssue;
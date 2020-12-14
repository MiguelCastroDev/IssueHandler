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
    let result = null;

    const {title, description, author, type, levelReq} = {...req.body};

    const query = `INSERT INTO issues (title, description, author, type, level) VALUES (?, ?, ?, ?, ?)`;

    logger.info(`> addIssue:${title}`);

    result = await addIssueData(query, title, description, author, type, levelReq);

    res.status(result.status).send(result.message);

    logger.info(`< addIssue:${title}`);
}

async function addProjectIssue(req, res, next){
    let result = null;
    let insertion = null;

    const query = `INSERT INTO issues (title, description, author, type, level) VALUES (?, ?, ?, ?, ?)`;
    const { title, description, author, type, levelReq} = {...req.body};
    const projectId = req.params.idProject;

    logger.info(`> addProjectIssue:${title}`);

    result = await addIssueData(query, title, description, author, type, levelReq);

    if (result.status == 201)
    {
        let connection = await mysqlPool.getConnection();

        const queryInsertionProjectIssue = `INSERT INTO project_issues (idIssue, idProject) VALUES (?, ?)`;
        const id = await getNewIssueId(title);

        try {
            if (id > -1) {
                insertion = await connection.query(queryInsertionProjectIssue, [id ,projectId]);
                connection.release();
                if (insertion[0].affectedRows > 0) {
                    logger.info(`>>>${title} add succesfully`);
                    result = getMessage(201, MESSAGES.SUCCESS.ISSUE.ADDISSUESUCCESSTEXT);
                }
                else {
                    result = getMessage(404, MESSAGES.ERROR.ISSUE.ADDISSUEERRORTEXT);
                }
            } else {
                result = getMessage(400, MESSAGES.ERROR.ISSUE.ADDISSUEERRORTEXT);
            }
        } catch (e)
        {
            result = getMessage(404, MESSAGES.ERROR.ISSUE.ADDISSUEERRORTEXT);
        }
    }

    logger.info(`< addProjectIssue:${title}`);

    res.status(result.status).send(result.message);
}

/**
 * Inserción de incidencia en base de datos.
 * @param {*} query 
 * @param {*} title 
 * @param {*} description 
 * @param {*} author 
 * @param {*} type 
 * @param {*} levelReq 
 */
async function addIssueData(query, title, description, author, type, levelReq) {
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);

    logger.info(`> addIssueData:${title}`);

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
                result = getMessage(201, MESSAGES.SUCCESS.ISSUE.ADDISSUESUCCESSTEXT);
            }
        } catch (error) {
            logger.info(`>>>${title} add error`);
            result = getMessage(400, MESSAGES.ERROR.ISSUE.ADDISSUEERRORTEXT);
        }
    }

    logger.info(`< addIssueData:${title}`);

    return result;
}

/**
 * Obtiene el id del incidente generado
 */
async function getNewIssueId(title) {
    let result = -1;
    let connection = await mysqlPool.getConnection();

    const queryGetIssueId = 'SELECT * FROM issues WHERE title = ?';

    logger.info(`> getNewIssueId:${title}`);

    try{
        result = await connection.query(queryGetIssueId, [title]);
        connection.release();
        const issue = result[0];
        
        if ((issue!=null) && (issue.length > 0)) {
            result = issue[issue.length-1].id;
        }

    } catch(e){
        console.log(e);
    }

    logger.info(`> getNewIssueId:${title}`);

    return result;
}

module.exports = {
    addIssue,
    addProjectIssue
};
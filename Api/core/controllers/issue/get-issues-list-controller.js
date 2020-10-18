'use strict'

const mysqlPool = require('../../utils/db-pool');

/**
 * Obtiene un listado de incidencias
 * @param {*} req 
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function getIssuesList(req, res, next){
    let issuesList = null;

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query('SELECT * FROM issues');
        connection.release();
        issuesList = result[0];

        if (issuesList!=null) {
            res.status(200).send(issuesList);
        } else {
            res.status(404).send('No se han encontrado incidencias registradas');
        }
    } catch(e){
        console.log(e);
        res.status(404).send(e);
    }
}

module.exports = getIssuesList;
'use strict'

const mysqlPool = require('../../utils/db-pool');

/**
 * Obtiene un usuario por su id
 * @param {*} req 
 * @param {*} res Usuario
 * @param {*} next 
 */
async function getIssue(req, res, next){
    let issue = null;
    const param = req.params.id;
    const query = 'SELECT * FROM issues WHERE id = ?';

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query(query, [param]);
        connection.release();
        issue = result[0];

        if ((issue!=null) && (issue.length == 1)) {
            res.status(200).send(issue[0]);
        } else {
            res.status(404).send('No se encuentra la incidencia con los parametros indicados');
        }
    } catch(e){
        console.log(e);
        res.status(404).send(e);
    }
}

module.exports = getIssue;
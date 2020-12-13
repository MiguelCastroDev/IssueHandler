'use strict'

const mysqlPool = require('../../utils/db-pool');

/**
 * Obtiene un listado de proyectos
 * @param {*} req 
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function getProjects(req, res, next){
    let projects = null;

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query('SELECT * FROM projects');
        connection.release();
        projects = result[0];

        if (projects!=null) {
            res.status(200).send(projects);
        } else {
            res.status(404).send('No se han encontrado incidencias registradas');
        }
    } catch(e){
        console.log(e);
        res.status(404).send(e);
    }
}

module.exports = getProjects;
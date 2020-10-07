'use strict'

const mysqlPool = require('../../utils/db-pool');

/**
 * Obtiene el listado de usuarios
 * @param {*} req 
 * @param {*} res Array con el listado de usuarios
 * @param {*} next 
 */
async function getUsersList(req, res, next){
    let userList = null;

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query('SELECT * FROM users');
        connection.release();
        userList = result[0];

        if (userList!=null) {
            res.status(200).send(userList);
        } else {
            res.status(404).send('No se encuentran usuarios registrados');
        }
    } catch(e){
        console.log(e);
        res.status(404).send(e);
    }
}

module.exports = getUsersList;
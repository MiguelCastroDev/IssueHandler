'use strict'

const mysqlPool = require('../../utils/db-pool');

/**
 * Obtiene un usuario por su id
 * @param {*} req 
 * @param {*} res Usuario
 * @param {*} next 
 */
async function getUser(req, res, next){
    let user = null;
    const param = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';

    try{
        const connection = await mysqlPool.getConnection();
        const result = await connection.query(query, [param]);
        connection.release();
        user = result[0];

        if ((user!=null) && (user.length == 1)) {
            res.status(200).send(user[0]);
        } else {
            res.status(404).send('No se encuentra el usuario con los parametros indicados');
        }
    } catch(e){
        console.log(e);
        res.status(404).send(e);
    }
}

module.exports = getUser;
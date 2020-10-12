'use strict'

const mysqlPool = require('../../utils/db-pool');

/**
 * Añade un usuario a la base de datos
 * @param {*} req Datos del nuevo usuario
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function addUser(req, res, next){
    var result = null;
    const {user, email, password} = {...req.body};
    const newUser = {
        user : user,
        email : email,
        password : password,
        rol : 0,
        deactive_date : null
    }
    const rol = 0;

    const query = `INSERT INTO users (user, email, password, rol) VALUES (? , ? , ?, ${rol})`;

    if (!user || !email || !password)
    {
        result = {
            code: 400,
            message: 'Parameters incorrect'
        }
    } else {
        try {
            const connection = await mysqlPool.getConnection();
            const insertion = await connection.query(query, [user, email, password]);
            connection.release();
            res.status(result.code).send(result.message);
        } catch (error) {
            result = {
                code: 400,
                message: `addUser: ${error}`
            }
            res.status(result.code).send(result.message);
        }

    }
}

module.exports = addUser;
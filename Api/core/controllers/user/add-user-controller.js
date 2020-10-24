'use strict'

const mysqlPool = require('../../utils/db-pool');
const bcrypt = require('bcrypt');

/**
 * Añade un usuario a la base de datos
 * @param {*} req Datos del nuevo usuario
 * @param {*} res 200 Si no se ha producido ningún problema
 * @param {*} next 
 */
async function addUser(req, res, next){
    let result = {
        status : 400,
        message : 'Error in request',
    };
    const {user, email, password} = {...req.body};
    const defaultRol = 0;

    const query = `INSERT INTO users (user, email, password, rol) VALUES (? , ? , ?, ${defaultRol})`;

    if (!user || !email || !password)
    {
        result = {
            status: 400,
            message: 'Parameters incorrect'
        }
    } else {
        try {
            let connection = await mysqlPool.getConnection();
            let hashPassword = await bcrypt.hash(password, 10);
            const insertion = await connection.query(query, [user, email, hashPassword]);
            connection.release();
            if (insertion[0].affectedRows > 0) {
                result.status = 201;
                result.message = `El usuario ${user} se ha insertado correctamente`;
            }

            res.status(result.status).send(result.message);
        } catch (error) {
            result = {
                status: 400,
                message: `Error (addUser): ${error}`
            }
            res.status(result.status).send(result.message);
        }

    }
}

module.exports = addUser;
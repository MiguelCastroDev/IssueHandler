'use strict'

const mysqlPool = require('../../utils/db-pool');
const bcrypt = require('bcrypt');

/**
 * Busca un usuario por su email, y a continuación comprueba si su password coincide
 * @param {*} req 
 * @param {*} res Usuario
 * @param {*} next 
 */
async function getLoggedUserController(req, res, next){
    let user = null;
    const {email, password} = {...req.body};
    const query = 'SELECT * FROM users WHERE email = ?';

    if (email != null & password != null) {
        try{
            const connection = await mysqlPool.getConnection();
            const result = await connection.query(query, [email]);
            connection.release();
            user = result[0];

            if ((user!=null)) {
                if (await bcrypt.compare(password,user[0].password)) {
                    //Devolvemos el objeto usuario sin password
                    user[0].password = '';
                    res.status(200).send(user[0]);
                }
                else {
                    res.status(401).send('Password incorrecta');
                }
            } else {
                res.status(404).send('No existe ningún usuario con ese correo');
            }
        } catch(e){
            console.log(e);
            res.status(404).send(e);
        }
    } else {
        res.status(400).send('No se han introducido datos');
    }
}

module.exports = getLoggedUserController;
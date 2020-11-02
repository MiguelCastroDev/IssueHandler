'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MESSAGES, getMessage } = require('../../utils/messages/text-messages');
const mysqlPool = require('../../utils/db-pool');
const logger = require('../../utils/logger');

function validateData(email) {
    logger.info(`>>>ValidateData`);

    let result = false;

    if (email !== null) {
        result = true;
    }

    logger.info(`<<<ValidateData: ${email}`);
    return result;
}

/**
 * Busca un usuario por su email, y a continuación comprueba si su password coincide
 * @param {*} req 
 * @param {*} res Usuario
 * @param {*} next 
 */
async function getLoggedUserController(req, res, next){
    
    let result = getMessage(200, MESSAGES.ERROR.DEFAULT);
    const {email, password} = {...req.body};
    const query = `SELECT * FROM users WHERE email = '${email}'`;

    logger.info(`>>>Login email: ${email}`);

    try {
        //Validamos los datos de entrada
        if (validateData(email)) {
            let connection = await mysqlPool.getConnection();
            const data = (await connection.query(query))[0];

            if (data.length === 1) {
                if ( (data.activated_date === null) || (data.activated_date === undefined) ) {
                    const correctPassword = await bcrypt.compare(password, data.password);

                    if (!correctPassword) {
                        result = getMessage(401, MESSAGES.ERROR.LOGIN.INCORRECTPASSWORDTEXT);
                    } else {
                        const payloadJwt = {
                                                uuid: data.email,
                                                role: (data.rol === 0) ? 0 : 1,
                                            };
                        const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
                        const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
                            expiresIn: jwtTokenExpiration
                        });

                        result.message = {
                            accessToken: token,
                            expiresIn: jwtTokenExpiration,
                        }
                    }

                } else {
                    result = getMessage(401, MESSAGES.ERROR.LOGIN.ACCOUNTNOTACTIVETEXT);
                }
            } else {
                result = getMessage(400, MESSAGES.ERROR.LOGIN.INCONSISTENTDATATEXT);
            }

        } else {
            result = getMessage(400, MESSAGES.ERROR.REQUESTPARAMETERS.INCORRECTPARAMETERSTEXT);
        }
    }catch (e) {
        logger.error(`>Error in login with mail: ${email}`);
        result = getMessage(400, MESSAGES.ERROR.LOGIN.ERRORLOGINTEXT);
    }

    logger.info(`<<<Login email: ${email}`);
    res.status(result.status).send(result.message);
}

module.exports = getLoggedUserController;
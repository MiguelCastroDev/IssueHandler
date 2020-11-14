'use strict'

const jwt = require('jsonwebtoken');

const { AUTH_JWT_SECRET: authJwtSecret } = process.env;


/**
 *  Check that the frontend send the token and that is valid
 */
function checkJwtToken(req, res, next) {

    const { authorization } = req.headers;

    if (!authorization) {
    return res.status(401).send();
    }

    // Check that token include prefix JWT
    const [prefix, token] = authorization.split(' ');
    if (prefix !== 'JWT') {
        return res.status(401).send();
    }

    if (!token) {
        return res.status(401).send();
    }

    try {
        //Decoded token and obtein values  
        const decoded = jwt.verify(token, authJwtSecret);

        req.claims = {
            email: decoded.email,
            role: decoded.role,
        };
            
        return next();
    } catch (e) {
        return res.status(401).send();
    }
}

module.exports = checkJwtToken;
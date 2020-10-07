'use strict'

//const user = require('../../../database/models/User');
const mysqlPool = require('../../utils/db-pool');

async function getUsersList(req, res, next){
    
    try{
        const connection = await mysqlPool.getConnection();
        console.log('GetUserListController');
        const result = await connection.query('SELECT * FROM users',{
            
        });
        connection.release();
        console.log(result[0]);
    } catch(e){
        console.log(e);
        res.status(404).send(e);
    }
}

module.exports = getUsersList;
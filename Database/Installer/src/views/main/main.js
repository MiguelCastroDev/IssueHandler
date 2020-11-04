const logger = require('../../../utils/logger');
const databasePool = require('../../../utils/db-pool');
const config = require('dotenv').config(); 
const structure = require('../../database-structure/structure');

function checkConnection() {
    
}

async function install() {
    try {
        await databasePool.connect(config.parsed);
        structure.install(databasePool);
    } catch (e) {
        console.log(e);
    }
}
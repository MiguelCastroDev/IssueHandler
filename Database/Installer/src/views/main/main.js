const logger = require('../../../utils/logger');
const databasePool = require('../../../utils/db-pool');
const structure = require('../../database-structure/structure');

function checkConnection() {
    
}

async function install() {
    try {
        structure.install();
    } catch (e) {
        console.log(e);
    }
}
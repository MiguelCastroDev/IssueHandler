const logger = require('../../../utils/logger');
const databasePool = require('../../../utils/db-pool');
const structure = require('../../database-structure/structure');
const BASE_VERSION = 1;

function checkConnection() {
    
}

async function install() {
    try {
        let succesfullyInstall = await structure.install();

        if (succesfullyInstall)
        {
            structure.setVersion(BASE_VERSION);
        }
    } catch (e) {
        console.log(e);
    }
}
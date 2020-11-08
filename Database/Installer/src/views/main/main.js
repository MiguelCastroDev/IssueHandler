const logger = require('../../../utils/logger');
const structure = require('../../database-structure/structure');
const BASE_VERSION = 1;

async function install() {
    logger.info(`>>>INSTALL SELECTED`);

    try {
        var parameters = {
            MYSQL_USER : document.getElementById('user').value,
            MYSQL_PASSWORD : document.getElementById('pass').value,
            MYSQL_HOST : document.getElementById('host').value,
            MYSQL_PORT : document.getElementById('port').value,
            MYSQL_DATABASE : document.getElementById('database').value
        }

        let succesfullyInstall = await structure.install(parameters);

        if (succesfullyInstall)
        {
            structure.setVersion(BASE_VERSION, parameters);
            logger.info(`>>>INSTALL SELECTED: Finish`);
        } else {
            logger.error(`>>>INSTALL SELECTED: Error`);
        }
    } catch (e) {
        logger.error(`>>>INSTALL SELECTED: `+e);
    }
}
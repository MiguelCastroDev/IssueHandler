const logger = require('../../utils/logger');
const databasePool = require('../../utils/db-pool');
const notifier = require('node-notifier');
let query = '';
let connection = null;

/**
 * Get general info from database
 */
async function get(parameters) {
    logger.info(`>>>GETINFO`);
    let result = null;

    try {
            await databasePool.connect(parameters);
            connection = await databasePool.getConnection();

            query = `SELECT * FROM version`;
                
            result = await connection.query(query);

            notifier.notify({
                title: parameters.MYSQL_DATABASE+':'+result[0][0].datatabase_version,
                message: 'Última actualización: '+result[0][0].updateAt.toDateString(),
                icon: '../../icons/install-icon.png'
            });

            logger.info(`>GETINFO: Finish`);
    } catch (e) {
        logger.error(`>GETINFO: Error`);
    }
    logger.info(`<<<GETINFO`);
    return result;
}

module.exports = {
    get
} 
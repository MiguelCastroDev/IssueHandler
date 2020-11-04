'use strict'

const mysql = require('mysql2');

async function connect(config) {
    const options = {
        connectionLimit: 10,
        host: config.MYSQL_HOST,
        user: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
        port: config.MYSQL_PORT,
        timezone: 'Z',
        // debug: true,
        multipleStatements: true,
    };

    /**
     * Create connection pool and
     * promisify it to use async / await
     */
    const pool = mysql.createPool(options);
    this.pool = pool.promise();

    try {
        const connection = await this.pool.getConnection();
        if (connection) {
            connection.release();
        }
    } catch (e) {
        console.error('mysql pool connect', e);
        throw e;
    }
}

async function getConnection() {
    if (this.pool === null) {
        throw new Error("MySQL connection didn't established. You must connect first.");
    }

    const connection = await this.pool.getConnection();

    return connection;
}

module.exports = {
    connect,
    getConnection,
};
const logger = require('../../utils/logger');
const DATABASE_NAME = 'DatabaseTest';
let query = '';
let step = -1;
let connection = null;

async function install(databasePool) {
    logger.info(`>>>INSTALL`);

    try {
        connection = await databasePool.getConnection();

        /////////////////
        //CREATE DATABASE
        /////////////////
        query = `CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`;
        await connection.query(query);
        connection.release();
        step++;
        logger.info(`>>>INSTALL ${step}: Database`);
        /////////////////

        /////////////////
        //CREATE ROLES TABLE
        /////////////////
        query = `CREATE TABLE IF NOT EXISTS roles (` +
                `id int NOT NULL auto_increment, `+
                `name VARCHAR(45) NOT NULL, `+
                `description VARCHAR(45) NULL DEFAULT NULL, `+
                `PRIMARY KEY (id));`;
                
        await connection.query(query);
        connection.release();
        step++;
        logger.info(`>>>INSTALL ${step}: Roles table`);
        /////////////////

        //TODO: Add foreign key
        /////////////////
        //CREATE USERS TABLE
        /////////////////
        query = `CREATE TABLE IF NOT EXISTS users (` +
                `id int NOT NULL auto_increment, ` +
                `user VARCHAR(45) NOT NULL, ` +
                `email VARCHAR(45) NOT NULL, ` +
                `password VARCHAR(150) NOT NULL, ` +
                `rol int NOT NULL, ` +
                `deactive_date DATETIME DEFAULT NULL, ` +
                `activated_date DATETIME DEFAULT NULL, ` +
                `PRIMARY KEY (id), ` +
                `UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE);`;
                
        await connection.query(query);
        connection.release();
        step++;
        logger.info(`>>>INSTALL ${step}: Users table`);
        /////////////////

        /////////////////
        //CREATE USER_ROL TABLE
        /////////////////
        query = `CREATE TABLE user_rol ( `+
                `id int NOT NULL AUTO_INCREMENT, `+
                `idUser int NOT NULL, `+
                `idRol int NOT NULL, `+
                `PRIMARY KEY (id), `+
                `INDEX fk_idUser_idx (idUser ASC) VISIBLE, `+
                `INDEX fk_idRol_idx (idRol ASC) VISIBLE, `+
                `CONSTRAINT fk_idRol `+
                `FOREIGN KEY (idRol) `+
                `REFERENCES roles (id) `+
                `ON DELETE NO ACTION `+ 
                `ON UPDATE NO ACTION, `+
                `CONSTRAINT fk_idUser `+
                `FOREIGN KEY (idUser) `+
                `REFERENCES users (id) `+
                `ON DELETE NO ACTION `+
                `ON UPDATE NO ACTION); `;
                
        await connection.query(query);
        connection.release();
        step++;
        logger.info(`>>>INSTALL ${step}: User_Rol table`);
        /////////////////

    } catch(e) {
        logger.error(`ERROR INSTALL ${step} `+e);
    }

    logger.info(`<<<INSTALL`);
}

module.exports = {
    install
} 
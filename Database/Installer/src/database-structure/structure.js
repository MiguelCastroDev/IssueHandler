const logger = require('../../utils/logger');
let config = require('dotenv').config(); 
let query = '';
let step;
let connection = null;

async function install() {
    logger.info(`>>>INSTALL`);
    step = -1;

    try {
        await databasePool.connect(config.parsed);
        connection = await databasePool.getConnection();

        /////////////////
        //CREATE DATABASE
        /////////////////
        

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
        query = `CREATE TABLE IF NOT EXISTS user_rol ( `+
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

        /////////////////
        //CREATE ISSUE_LEVELS TABLE
        /////////////////
        query = `CREATE TABLE IF NOT EXISTS issue_levels ( `+
                `id INT NOT NULL AUTO_INCREMENT, `+
                `name VARCHAR(20) NOT NULL, `+
                `description VARCHAR(100) NULL DEFAULT NULL, ` +
                `PRIMARY KEY (id)); `;
                
        await connection.query(query);
        connection.release();
        step++;
        logger.info(`>>>INSTALL ${step}: Issue_Level table`);
        /////////////////

        /////////////////
        //CREATE ISSUE_TYPES TABLE
        /////////////////
        query = `CREATE TABLE IF NOT EXISTS issue_types ( `+
                `id INT NOT NULL AUTO_INCREMENT, `+
                `name VARCHAR(20) NOT NULL, `+
                `description VARCHAR(100) NULL DEFAULT NULL, ` +
                `PRIMARY KEY (id)); `;
                
        await connection.query(query);
        connection.release();
        step++;
        logger.info(`>>>INSTALL ${step}: Issue_Types table`);
        /////////////////

        /////////////////
        //CREATE PROJECT TABLE
        /////////////////
        query = `CREATE TABLE IF NOT EXISTS project ( `+
                `id INT NOT NULL AUTO_INCREMENT, `+
                `name VARCHAR(20) NOT NULL, `+
                `description VARCHAR(100) NULL DEFAULT NULL, ` +
                `PRIMARY KEY (id)); `;
                
        await connection.query(query);
        connection.release();
        step++;
        logger.info(`>>>INSTALL ${step}: Project table`);
        /////////////////

        /////////////////
        //CREATE ISSUES TABLE
        /////////////////
        query = `CREATE TABLE IF NOT EXISTS issues ( `+
                `id INT NOT NULL AUTO_INCREMENT, `+
                `title VARCHAR(100) NOT NULL, `+
                `description VARCHAR(400) NOT NULL, `+
                ` author INT NOT NULL, `+
                ` type INT NOT NULL, `+
                ` level INT NULL DEFAULT NULL, `+
                ` deactivate_date DATETIME NULL DEFAULT NULL, `+
                ` PRIMARY KEY (id), `+
                ` INDEX fk_idAuthor_idx (author ASC) VISIBLE, `+
                ` INDEX fk_idIssueLevel_idx (level ASC) VISIBLE, `+
                ` INDEX fk_idIssueType_idx (type ASC) VISIBLE, `+
                ` CONSTRAINT fk_idAuthor `+
                ` FOREIGN KEY (author) `+
                ` REFERENCES users (id) `+
                ` ON DELETE NO ACTION `+
                ` ON UPDATE NO ACTION, `+
                ` CONSTRAINT fk_idIssueLevel `+
                ` FOREIGN KEY (level) `+
                ` REFERENCES issue_levels (id) `+
                ` ON DELETE NO ACTION `+
                ` ON UPDATE NO ACTION, `+
                ` CONSTRAINT fk_idIssueType `+
                ` FOREIGN KEY (type) `+
                ` REFERENCES issue_types (id) `+
                ` ON DELETE NO ACTION `+
                ` ON UPDATE NO ACTION);`;
                
        await connection.query(query);
        connection.release();
        step++;
        logger.info(`>>>INSTALL ${step}: Issues table`);
        /////////////////

        /////////////////
        //CREATE COMMENTS TABLE
        /////////////////
        query = `CREATE TABLE IF NOT EXISTS comments (`+
                ` idUser INT NOT NULL,`+
                ` comment VARCHAR(10000) NOT NULL,`+
                ` createdAt DATETIME NOT NULL,`+
                ` id INT NOT NULL AUTO_INCREMENT,`+
                ` idIssue INT NOT NULL,`+
                ` PRIMARY KEY (id),`+
                ` INDEX fk_idIssueComments_idx (idIssue ASC) VISIBLE,`+
                ` INDEX fk_idUsserComment_idx (idUser ASC) VISIBLE,`+
                ` CONSTRAINT fk_idIssueComments`+
                ` FOREIGN KEY (idIssue)`+
                ` REFERENCES issues (id)`+
                ` ON DELETE NO ACTION`+
                ` ON UPDATE NO ACTION,`+
                ` CONSTRAINT fk_idUsserComment`+
                ` FOREIGN KEY (idUser)`+
                ` REFERENCES users (id)`+
                ` ON DELETE NO ACTION`+
                ` ON UPDATE NO ACTION);`;
            
    await connection.query(query);
    connection.release();
    step++;
    logger.info(`>>>INSTALL ${step}: Comments table`);
    /////////////////

    } catch(e) {
        logger.error(`ERROR INSTALL ${step} `+e);
        step = -1;
    }

    logger.info(`<<<INSTALL`);
}

module.exports = {
    install
} 
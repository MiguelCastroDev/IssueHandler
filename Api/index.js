'use strict'

/**
 * Libraries config
 */
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('./core/utils/logger');
const databasePool = require('./core/utils/db-pool');

const port = (process.env.PORT || 3000);
const app = express();
const nexus = '/api';
const routers = require('./core/routes');

/**
 * Special middleware for config cors
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send({
    error: `Body parser: ${err.message}`,
    });
});

/**
 * Routes
 */
app.use(nexus, routers.userRouter);
app.use(nexus, routers.issueRouter);
app.use(nexus, routers.rolRouter);
app.use(nexus, routers.swaggerRouter);


  //Init server
(async function init() {
    try {
        await databasePool.connect();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
    
    app.listen(port, () => {
        logger.info("Start server");
        console.log(`The backend server is running in ${port}. Have a nice day`);
    });
})();

module.exports = app;
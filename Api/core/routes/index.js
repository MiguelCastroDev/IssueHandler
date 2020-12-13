'use strict'

const issueRouter = require('./issue-router');
const projectRouter = require('./project-router');
const rolRouter = require('./rol-router');
const swaggerRouter = require('./swagger-router');
const userRouter = require('./user-router');

module.exports = {
    issueRouter,
    projectRouter,
    rolRouter,
    swaggerRouter,
    userRouter
}
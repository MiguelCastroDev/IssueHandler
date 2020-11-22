'use strict'

const userRouter = require('./user-router');
const issueRouter = require('./issue-router');
const swaggerRouter = require('./swagger-router')

module.exports = {
    userRouter,
    issueRouter,
    swaggerRouter
}
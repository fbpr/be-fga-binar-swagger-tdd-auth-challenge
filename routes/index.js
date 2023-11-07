const express = require('express');
const router = express.Router();
const usersRoute = require('./users.route');
const accountsRoute = require('./accounts.route');
const transactionsRoute = require('./transactions.route');
const authRoute = require('./auth.route');

router.use('/v1', [usersRoute, accountsRoute, transactionsRoute, authRoute]);

module.exports = router;

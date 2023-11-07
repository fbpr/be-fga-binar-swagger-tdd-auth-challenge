const express = require('express');
const router = express.Router();
const usersRoute = require('./users.route');
const accountsRoute = require('./accounts.route');
const transactionsRoute = require('./transactions.route');

router.use('/v1', [usersRoute, accountsRoute, transactionsRoute]);

module.exports = router;

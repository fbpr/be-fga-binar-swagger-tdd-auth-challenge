const express = require('express');
const {
  addTransaction,
  getTransactionById,
  getTransactions,
} = require('../controllers/transactions.controller');
const transactionValidator = require('../middleware/validator/transactions');
const router = express.Router();

router.get('/transactions', getTransactions);
router.get('/transactions/:transactionId', getTransactionById);
router.post('/transactions', transactionValidator, addTransaction);

module.exports = router;

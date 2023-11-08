const express = require('express');
const {
  addTransaction,
  getTransactionById,
  getTransactions,
} = require('../controllers/transactions.controller');
const transactionValidator = require('../middleware/validator/transactions');
const router = express.Router();

/**
 * @swagger
 * /transactions:
 *   get:
 *     tags:
 *      - "Transaction"
 *     summary: Get all Transactions
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Not found
 */
router.get('/transactions', getTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     tags:
 *      - "Transaction"
 *     summary: Get a Transaction by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Id of the transaction
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Not found
 */
router.get('/transactions/:transactionId', getTransactionById);

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags:
 *      - "Transaction"
 *     summary: Create a Transaction
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                source_account_id:
 *                  type: number
 *                destination_account_id:
 *                  type: number
 *                amount:
 *                  type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 */
router.post('/transactions', transactionValidator, addTransaction);

module.exports = router;

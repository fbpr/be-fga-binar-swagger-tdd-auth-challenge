const express = require('express');
const {
  createAccount,
  getAccounts,
  getAccountsById,
  editAccount,
  deleteAccount,
} = require('../controllers/accounts.controller');
const accountValidator = require('../middleware/validator/accounts');
const router = express.Router();

/**
 * @swagger
 * /accounts:
 *   get:
 *     tags:
 *      - "Bank Account"
 *     summary: Get all Bank Accounts
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Not found
 */
router.get('/accounts', getAccounts);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     tags:
 *      - "Bank Account"
 *     summary: Get a Bank Account by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/accounts/:accountId', getAccountsById);

/**
 * @swagger
 * /accounts:
 *   post:
 *     tags:
 *      - "Bank Account"
 *     summary: Create a Bank Account
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: string
 *                bank_name:
 *                  type: string
 *                bank_account_number:
 *                  type: string
 *                balance:
 *                  type: number
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Bad request
 */
router.post('/accounts', accountValidator, createAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     tags:
 *      - "Bank Account"
 *     summary: Update a bank account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Id of the user
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                balance:
 *                  type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 */
router.put('/accounts/:accountId', editAccount);

router.delete('/accounts/:accountId'), deleteAccount;

module.exports = router;

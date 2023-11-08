const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} = require('../controllers/users.controller');
const userValidator = require('../middleware/validator/users');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Get all Users
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Not found
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Get a User by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Id of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Not found
 */
router.get('/users/:userId', getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Create a User
 *     description: Create new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              identity_type:
 *                type: string
 *              identity_number:
 *                type: string
 *              address:
 *                type: string
 *     responses:
 *      201:
 *        description: Successfully created
 *      500:
 *        description: Internal server error
 */
router.post('/users', userValidator, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *      - "User"
 *     summary: Update a User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 */
router.put('/users/:userId', editUser);

router.delete('/users/:userId', deleteUser);

module.exports = router;

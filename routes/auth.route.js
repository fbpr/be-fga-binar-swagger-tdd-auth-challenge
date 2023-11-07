const express = require("express");
const { register, login, authenticate } = require("../controllers/auth.controller");
const restrict = require("../middleware/authenticate");
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: Create a User using Auth
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
 *                identity_type:
 *                  type: string
 *                identity_number:
 *                  type: string
 *                address:
 *                  type: string
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/auth/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: Login User using Auth
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/auth/login", login);

/**
 * @swagger
 * /auth/authenticate:
 *   get:
 *     tags:
 *      - "Auth"
 *     summary: Get Authenticated User
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         description: The token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *        description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/auth/authenticate", restrict, authenticate);
module.exports = router;
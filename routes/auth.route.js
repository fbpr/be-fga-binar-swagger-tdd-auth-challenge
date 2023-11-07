const express = require("express");
const { register, login, authenticate } = require("../controllers/auth.controller");
const restrict = require("../middleware/authenticate");
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/auth/authenticate", restrict, authenticate);
module.exports = router;
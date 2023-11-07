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

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', userValidator, createUser);
router.put('/users/:userId', editUser);
router.delete('/users/:userId', deleteUser);

module.exports = router;

const { PrismaClient } = require('@prisma/client');
const responseTemplate = require('../helpers/response.helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { name, email, password, identity_type, identity_number, address } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existUser = await prisma.users.findUnique({ where: { email } });

    if (existUser) {
      const response = responseTemplate(null, 'User already exists', null, 400);
      res.status(400).json(response);
      return;
    }

    const payload = {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          identity_type,
          identity_number,
          address,
        },
      },
    };

    const user = await prisma.users.create({
      data: payload,
    });
    const response = responseTemplate(user.id, 'success', null, 201);
    res.status(201).json(response);
    return;
  } catch (error) {
    const response = responseTemplate(
      null,
      'internal server error',
      error.message,
      500
    );
    res.status(500).json(response);
    return;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      const response = responseTemplate(null, 'Invalid email', null, 400);
      res.status(400).json(response);
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      const response = responseTemplate(null, 'Invalid password', null, 400);
      res.status(400).json(response);
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    const response = responseTemplate(
      {
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      },
      'success',
      null,
      200
    );
    res.status(200).json(response);
    return;
  } catch (error) {
    const response = responseTemplate(
      null,
      'internal server error',
      error,
      500
    );
    res.status(500).json(response);
    return;
  }
};

const authenticate = async (req, res) => {
  const response = responseTemplate({ user: req.user }, 'success', null, 200);
  res.status(200).json(response);
  return;
};

module.exports = {
  register,
  login,
  authenticate,
};

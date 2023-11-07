const { PrismaClient } = require('@prisma/client');
const responseTemplate = require('../helpers/response.helper');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { name, email, password, identity_type, identity_number, address } =
      req.body;

    const payload = {
      name,
      email,
      password,
      profile: {
        create: {
          identity_type,
          identity_number,
          address,
        },
      },
    };

    const { id } = await prisma.users.create({
      data: payload,
      include: {
        profile: true,
      },
    });

    const response = responseTemplate({ id }, 'success', null, 201);
    res.json(response);
    return;
  } catch (error) {
    const response = responseTemplate(
      null,
      'internal server error',
      error,
      500
    );
    res.json(response);
    return;
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            identity_type: true,
            identity_number: true,
            address: true,
          },
        },
      },
    });

    const response = responseTemplate(users, 'success', null, 200);
    res.json(response);
    return;
  } catch (error) {
    const response = responseTemplate(
      null,
      'internal server error',
      error,
      500
    );
    res.json(response);
    return;
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            identity_type: true,
            identity_number: true,
            address: true,
          },
        },
      },
    });

    const response = responseTemplate(user, 'success', null, 200);
    res.json(response);
    return;
  } catch (error) {
    const response = responseTemplate(
      null,
      'internal server error',
      error,
      500
    );
    res.json(response);
    return;
  }
};

async function editUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const { userId } = req.params;

    const payload = {
      name,
      email,
      password,
    };

    await prisma.users.update({
      where: {
        id: Number(userId),
      },
      data: payload,
    });

    const response = responseTemplate(null, 'success', null, 200);
    res.json(response);
    return;
  } catch (error) {
    const response = responseTemplate(
      null,
      'internal server error',
      error,
      500
    );
    res.json(response);
    return;
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    await prisma.users.delete({
      where: {
        id: Number(userId),
      },
    });

    const response = responseTemplate(null, 'success', null, 200);
    res.json(response);
    return;
  } catch (error) {
    const response = responseTemplate(
      null,
      'internal server error',
      error,
      500
    );
    res.json(response);
    return;
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
};

const { PrismaClient } = require('@prisma/client');
const responseTemplate = require('../helpers/response.helper');

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return Number(this);
};

const createAccount = async (req, res) => {
  try {
    const { user_id, bank_name, bank_account_number, balance } = req.body;

    const payload = {
      user_id,
      bank_name,
      bank_account_number,
      balance,
    };

    const { id } = await prisma.bankAccounts.create({
      data: payload,
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

const getAccounts = async (req, res) => {
  try {
    const accounts = await prisma.bankAccounts.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const response = responseTemplate(accounts, 'success', null, 200);
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

async function getAccountsById(req, res) {
  try {
    const accountId = Number(req.params.accountId);
    const account = await prisma.bankAccounts.findUnique({
      where: {
        id: accountId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const response = responseTemplate(account, 'success', null, 200);
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

async function editAccount(req, res) {
  const { balance } = req.body;
  const accountId = Number(req.params.id);

  const payload = {
    balance,
  };

  try {
    const account = await prisma.bankAccounts.update({
      where: {
        id: accountId,
      },
      data: payload,
    });

    const response = responseTemplate(account, 'success', null, 200);
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

async function deleteAccount(req, res) {
  const accountId = Number(req.params.id);

  try {
    await prisma.bankAccounts.delete({
      where: {
        id: accountId,
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
  createAccount,
  getAccounts,
  getAccountsById,
  editAccount,
  deleteAccount,
};

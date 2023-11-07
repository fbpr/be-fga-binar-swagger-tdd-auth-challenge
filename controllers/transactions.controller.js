const { PrismaClient } = require('@prisma/client');
const responseTemplate = require('../helpers/response.helper');

const prisma = new PrismaClient();

async function addTransaction(req, res) {
  try {
    const { source_account_id, destination_account_id, amount } = req.body;

    const payload = {
      source_account_id,
      destination_account_id,
      amount,
    };

    const source = await prisma.bankAccounts.findUnique({
      where: {
        id: payload.source_account_id,
      },
    });

    const destination = await prisma.bankAccounts.findUnique({
      where: {
        id: payload.destination_account_id,
      },
    });

    if (!source || !destination) {
      const response = responseTemplate(
        null,
        'Source or destination account not found',
        null,
        404
      );
      res.json(response);
      return;
    }

    if (source.balance < payload.amount) {
      const response = responseTemplate(
        null,
        'insufficient balance',
        null,
        400
      );
      res.json(response);
      return;
    }

    await prisma.bankAccounts.update({
      where: {
        id: source_account_id,
      },
      data: {
        balance: source.balance - BigInt(payload.amount),
      },
    });

    await prisma.bankAccounts.update({
      where: {
        id: destination_account_id,
      },
      data: {
        balance: source.balance + BigInt(payload.amount),
      },
    });

    const { id } = await prisma.transactions.create({
      data: payload,
    });

    const response = responseTemplate({ id }, 'success', null, 200);
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

async function getTransactions(req, res) {
  try {
    const transaction = await prisma.transactions.findMany();
    console.log(transaction);
    const response = responseTemplate(transaction, 'success', null, 200);
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

async function getTransactionById(req, res) {
  const { transactionId } = req.params;

  try {
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: Number(transactionId),
      },
      include: {
        source_account: true,
        destination_account: true,
      },
    });

    const response = responseTemplate(transaction, 'success', null, 200);
    res.json(response);
    return;
  } catch (error) {
    const response = responseTemplate(null, error.message, error, 500);
    res.json(response);
    return;
  }
}

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
};

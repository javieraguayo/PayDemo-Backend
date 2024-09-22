const { getTransactions } = require('../services/firestoreService');

const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await getTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTransactionHistory };
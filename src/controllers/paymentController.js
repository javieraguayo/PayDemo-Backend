const { processPayment } = require('../services/firestoreService');

const pay = async (req, res) => {
  const { name, cardNumber, expirationDate, cvv, amount } = req.body;
  try {
    const result = await processPayment(name, cardNumber, expirationDate, cvv, amount);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { pay };
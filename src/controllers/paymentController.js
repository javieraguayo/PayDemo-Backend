const { processPayment } = require('../services/firestoreService');

const pay = async (req, res) => {
  const { name, cardNumber, expirationDate, cvv, amount } = req.body;
  const uid = req.user.uid;

  try {
    const result = await processPayment(name, cardNumber, expirationDate, cvv, amount, uid);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { pay };

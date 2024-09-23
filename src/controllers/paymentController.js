const { processPayment } = require('../services/firestoreService');

const pay = async (req, res) => {
  const { name, cardNumber, expirationDate, cvv, amount } = req.body;
  const uid = req.user.uid;

  try {
    console.log('Procesando pago para el usuario con uid:', uid);
    const result = await processPayment(name, cardNumber, expirationDate, cvv, amount, uid);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al procesar el pago:', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { pay };

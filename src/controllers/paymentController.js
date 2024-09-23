const { processPayment } = require('../services/firestoreService');

const pay = async (req, res) => {
  const { name, cardNumber, expirationDate, cvv, amount } = req.body;
  
  console.log('Datos recibidos en el controlador:', { name, cardNumber, expirationDate, cvv, amount });
  
  try {
    const result = await processPayment(name, cardNumber, expirationDate, cvv, amount);
    
    console.log('Resultado del pago:', result);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al procesar el pago:', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { pay };

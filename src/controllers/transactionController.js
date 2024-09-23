const { getTransactions } = require('../services/firestoreService');

const getTransactionHistory = async (req, res) => {
  try {
    const uid = req.user.uid;  // Obtener el uid del usuario autenticado
    console.log('Obteniendo transacciones para el usuario con uid:', uid);
    
    const transactions = await getTransactions(uid);  // Filtrar transacciones por uid
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error al obtener las transacciones:', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTransactionHistory };

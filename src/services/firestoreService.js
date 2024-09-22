const admin = require('firebase-admin');
const db = admin.firestore();

const processPayment = async (name, cardNumber, expirationDate, cvv, amount) => {
  const now = new Date();
  const expiration = new Date(expirationDate);
  
  let status = 'exitosa';
  let reason = '';

  if (amount <= 5000) {
    status = 'fallida';
    reason = 'Monto bajo';
  } else if (expiration < now) {
    status = 'fallida';
    reason = 'Tarjeta vencida';
  }

  const transaction = {
    name,
    cardNumber,
    amount,
    status,
    reason,
    date: now.toISOString(),
  };

  await db.collection('transactions').add(transaction);
  return transaction;
};

const getTransactions = async () => {
    const transactionsRef = db.collection('transactions');
    const snapshot = await transactionsRef.get();
    const transactions = [];
    
    snapshot.forEach((doc) => {
      transactions.push(doc.data());
    });
  
    return transactions;
};
  
module.exports = { processPayment, getTransactions };
  


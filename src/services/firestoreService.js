const admin = require('firebase-admin');
const db = admin.firestore();

const processPayment = async (name, cardNumber, expirationDate, cvv, amount, uid) => {
  const now = new Date();
  const expiration = new Date(expirationDate);
  
  let status = 'exitosa';
  let reason = '';

  if (amount <= 5000) {
    status = 'fallida';
    reason = 'Monto debe ser mayor a 5000 CLP';
  } else if (expiration < now) {
    status = 'fallida';
    reason = 'Tarjeta vencida';
  }

  const transaction = {
    name,
    cardNumber,
    amount,
    status,
    cvv, 
    reason,
    date: now.toISOString(),
    uid,
  };

  await db.collection('transactions').add(transaction);
  return transaction;
};

const getTransactions = async (uid) => {
  const transactionsRef = db.collection('transactions').where('uid', '==', uid);
  const snapshot = await transactionsRef.get();
  const transactions = [];
  
  snapshot.forEach((doc) => {
    transactions.push(doc.data());
  });

  return transactions;
};

module.exports = { processPayment, getTransactions };

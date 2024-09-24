const admin = require('firebase-admin');
const db = admin.firestore();

const processPayment = async (name, cardNumber, expirationDate, cvv, amount, uid) => {
  const now = new Date();
  const [month, year] = expirationDate.split('/');
  const expiration = new Date(`20${year}-${month}-01T00:00:00Z`);

  let status = 'exitosa';
  let reasons = [];

  const numericAmount = parseInt(amount, 10);

  if (numericAmount <= 5000) {
    reasons.push('Monto debe ser mayor a $5.000');
  }

  if (expiration < now) {
    reasons.push('Tarjeta vencida');
  }

  if (reasons.length > 0) {
    status = 'fallida';
  }

  const transaction = {
    name,
    cardNumber,
    amount,
    status,
    cvv, 
    reasons,
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

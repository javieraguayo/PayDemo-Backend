const admin = require('firebase-admin');
const db = admin.firestore();

const processPayment = async (name, cardNumber, expirationDate, cvv, amount, uid) => {
  console.log('Datos recibidos en el backend:', { name, cardNumber, expirationDate, cvv, amount, uid });

  const now = new Date();
  // Convertir MM/YY a una fecha válida MM/01/YYYY
  const [month, year] = expirationDate.split('/');
  const expiration = new Date(`20${year}-${month}-01T00:00:00Z`);

  console.log('Fecha actual:', now);
  console.log('Fecha de expiración de la tarjeta:', expiration);

  let status = 'exitosa';
  let reason = '';

  if (amount <= 5000) {
    status = 'fallida';
    reason = 'Monto debe ser mayor a 5000 CLP';
  } else if (expiration < now) {
    status = 'fallida';
    reason = 'Tarjeta vencida';
  }

  console.log('Resultado del proceso de pago:', { status, reason });

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

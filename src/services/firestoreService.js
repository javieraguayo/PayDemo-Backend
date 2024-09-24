const admin = require('firebase-admin');
const db = admin.firestore();

const processPayment = async (name, cardNumber, expirationDate, cvv, amount, uid) => {
  console.log('Datos recibidos en el backend:', { name, cardNumber, expirationDate, cvv, amount, uid });

  const now = new Date();
  const [month, year] = expirationDate.split('/');
  const expiration = new Date(`20${year}-${month}-01T00:00:00Z`);

  console.log('Fecha actual:', now);
  console.log('Fecha de expiración de la tarjeta:', expiration);

  let status = 'exitosa';
  let reasons = [];

  // Verificación del monto (asegurarse de que sea numérico)
  const numericAmount = parseInt(amount, 10); // Convertir el monto a un número entero
  console.log('Monto numérico procesado:', numericAmount);

  if (numericAmount <= 5000) {
    reasons.push('Monto debe ser mayor a 5000 CLP');
    console.log('Monto bajo detectado');
  }

  // Verificación de la fecha de expiración
  if (expiration < now) {
    reasons.push('Tarjeta vencida');
    console.log('Tarjeta vencida detectada');
  }

  // Si hay razones, cambiar el estado a fallida
  if (reasons.length > 0) {
    status = 'fallida';
  }

  console.log('Razones acumuladas:', reasons);
  console.log('Resultado del proceso de pago:', { status, reasons });

  const transaction = {
    name,
    cardNumber,
    amount,
    status,
    cvv, 
    reasons,  // Devuelve las razones como un array
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

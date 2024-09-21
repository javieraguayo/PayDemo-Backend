const admin = require('firebase-admin');
const firebase = require('firebase/app');
require('firebase/auth');

// Firebase Admin SDK setup
const serviceAccount = require('../../firebaseServiceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
};
firebase.initializeApp(firebaseConfig);

const registerUser = async (email, password, name) => {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
    return userRecord;
  } catch (error) {
    throw new Error('Error al registrar usuario: ' + error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

module.exports = { registerUser, loginUser };

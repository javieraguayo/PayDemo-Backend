const admin = require('firebase-admin');
const firebase = require('firebase/app');
require('firebase/auth');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
require('dotenv').config();  // Cargar las variables de entorno

// Firebase Admin SDK setup
const serviceAccount = require('../../config/firebaseServiceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

// Función para registrar un usuario
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

// Función para el login de usuario
const loginUser = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

module.exports = { registerUser, loginUser };

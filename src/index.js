const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middlewares/verifyToken'); // Importa el middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acceso autorizado', user: req.user });
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

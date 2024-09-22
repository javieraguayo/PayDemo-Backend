const express = require('express');
const { getTransactionHistory } = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', getTransactionHistory);

module.exports = router;
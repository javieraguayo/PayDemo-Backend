const express = require('express');
const { getTransactionHistory } = require('../controllers/transactionController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, getTransactionHistory);

module.exports = router;
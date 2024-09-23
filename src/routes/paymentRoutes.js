const express = require('express');
const { pay } = require('../controllers/paymentController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/', verifyToken, pay);

module.exports = router;

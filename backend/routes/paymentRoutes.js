const express = require('express');

const router = express.Router();

const {
    paySupplier
} = require('../controllers/paymentController');

const authMiddleware = require('../middleware/authMiddleware');

router.post(
    '/supplier-payment',
    authMiddleware,
    paySupplier
);

module.exports = router;
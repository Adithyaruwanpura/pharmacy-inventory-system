const express = require('express');

const router = express.Router();

const {
    getNearExpiryMedicines,
    getExpiredMedicines
} = require('../controllers/expiryController');

const authMiddleware = require('../middleware/authMiddleware');

// NEAR EXPIRY
router.get(
    '/near-expiry',
    authMiddleware,
    getNearExpiryMedicines
);

// EXPIRED
router.get(
    '/expired',
    authMiddleware,
    getExpiredMedicines
);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    getLowStockMedicines,
    getExpiredMedicines,
    getNearExpiryMedicines
} = require('../controllers/inventoryController');

router.get('/low-stock', getLowStockMedicines);
router.get('/expired', getExpiredMedicines);
router.get('/near-expiry', getNearExpiryMedicines);

module.exports = router;
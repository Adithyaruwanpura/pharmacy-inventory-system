const express = require('express');
const router = express.Router();

const {
    addMedicine,
    getMedicines
} = require('../controllers/medicineController');

router.post('/', addMedicine);
router.get('/', getMedicines);

module.exports = router;
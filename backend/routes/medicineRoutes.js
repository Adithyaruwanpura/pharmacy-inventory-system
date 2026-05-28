const express = require('express');
const router = express.Router();

const {
    addMedicine,
    getMedicines,
    updateMedicine,
    deleteMedicine
} = require('../controllers/medicineController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addMedicine);
router.get('/', authMiddleware, getMedicines);
router.put('/:id', authMiddleware, updateMedicine);
router.delete('/:id', authMiddleware, deleteMedicine);


module.exports = router;
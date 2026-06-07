const express = require('express');
const router = express.Router();

const {
    addMedicine,
    getMedicines,
    updateMedicine,
    deleteMedicine,
} = require('../controllers/medicineController');
const authMiddleware = require('../middleware/authMiddleware');

const roleMiddleware =
    require('../middleware/roleMiddleware');

//router.post('/', authMiddleware, addMedicine);
router.get('/', authMiddleware, getMedicines);
//router.put('/:id', authMiddleware, updateMedicine);
//router.delete('/:id', authMiddleware, deleteMedicine);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('admin'),
    addMedicine
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    updateMedicine
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    deleteMedicine
);


module.exports = router;
const express = require('express');
const router = express.Router();
const roleMiddleware =
    require('../middleware/roleMiddleware');

const {
    addSupplier,
    getSuppliers,
    updateSupplier,
    deleteSupplier
} = require('../controllers/supplierController');
const authMiddleware = require('../middleware/authMiddleware');


//router.post('/', authMiddleware, addSupplier);
router.get('/', getSuppliers);
//router.put('/:id', authMiddleware, updateSupplier);
//router.delete('/:id', authMiddleware, deleteSupplier);
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    deleteSupplier
);
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    updateSupplier
);
router.post(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    addSupplier
);

module.exports = router;
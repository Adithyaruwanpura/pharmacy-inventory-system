const express = require('express');
const router = express.Router();

const {
    addSupplier,
    getSuppliers,
    updateSupplier,
    deleteSupplier
} = require('../controllers/supplierController');

const authMiddleware =
    require('../middleware/authMiddleware');

const roleMiddleware =
    require('../middleware/roleMiddleware');


// GET ALL SUPPLIERS
router.get(
    '/',
    authMiddleware,
    getSuppliers
);

// ADD SUPPLIER
router.post(
    '/',
    authMiddleware,
    roleMiddleware('admin'),
    addSupplier
);

// UPDATE SUPPLIER
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    updateSupplier
);

// DELETE SUPPLIER
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    deleteSupplier
);

module.exports = router;
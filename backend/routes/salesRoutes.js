const express = require('express');
const router = express.Router();

const {
  addSale,
  getSales
} = require('../controllers/salesController');

router.post('/', addSale);
router.get('/', getSales);

module.exports = router;
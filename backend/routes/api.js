const express = require('express');
const router = express.Router();
const actions = require('../controllers/api/actions');

router.get("/", actions.addNewOrder);
router.get("/onas", actions.onas );
router.get("/showAllOrders", actions.showAllOrders);

module.exports = router;
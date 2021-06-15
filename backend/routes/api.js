const express = require('express');
const router = express.Router();
const actions = require('../controllers/api/actions');

router.get("/", actions.addNewOrder);
router.get("/onas", actions.onas );

module.exports = router;
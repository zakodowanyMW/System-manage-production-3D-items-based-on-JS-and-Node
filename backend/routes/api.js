const express = require('express');
const router = express.Router();
const actions = require('../controllers/api/actions');

router.get("/", actions.homepage );
router.get("/homepage", actions.homepage );
router.get("/onas", actions.onas );

module.exports = router;
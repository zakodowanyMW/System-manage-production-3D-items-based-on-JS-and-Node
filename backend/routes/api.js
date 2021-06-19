const express = require('express');
const router = express.Router();
const actions = require('../controllers/api/actions');

router.post("/newOrder", actions.addNewOrder);
router.get("/showAllOrders", actions.showAllOrders);
router.get("/oneOrder/:id", actions.getOneOrder);
router.put("/updateOrder/:id", actions.updateOrder);
router.delete("/delete/:id", actions.deleteOrder);

module.exports = router;
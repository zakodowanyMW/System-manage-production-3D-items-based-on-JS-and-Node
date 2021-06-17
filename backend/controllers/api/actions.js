const { response } = require('express');
const Order = require('../../database/dbModels');

module.exports = {
    addNewOrder(req , res ) {
        console.log(req.query);
        const newOrder = new Order({ 
            purcheser: req.query.purcheser,
            itemName: req.query.detailName,
            idDraw: req.query.orderID,
            material: req.query.Material
        });
        newOrder.save().then(() => console.log('save new order'));

        res.redirect("http://127.0.0.1:5500/frontend/index.html");
    },

    showAllOrders(req, res) {
        Order.find({}, function(err, response) {
            res.json(response);
        })
        
    },

    onas(req , res ) {
        res.send("Witaj ze strony o nas");
    }
}
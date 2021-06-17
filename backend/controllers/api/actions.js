const { response } = require('express');
const Order = require('../../database/dbModels');

module.exports = {
    addNewOrder(req , res ) {
        const newOrder = new Order({ 
            purcheser: 'Marcin Winiarski',
            itemName: "Podpora piły szybkiej 1",
            idDraw: "Z124",
            material: "PET-G black"
        });
        newOrder.save().then(() => console.log('save new order'));

        res.send("Server działa mimo to");
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
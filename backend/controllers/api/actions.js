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

    //getAll
    showAllOrders(req, res) {
        Order.find({}, function(err, response) {
            res.json(response);
        })    
    },

    //get one order
    getOneOrder(req, res) {
        const param = req.params.id;
        Order.findOne({idDraw: param}, function(err,respone) {
            res.json(respone);
        })
    },

    //update
    updateOrder(req, res) {
        const param = req.params.id;
        console.log(req.body)
        console.log(param)

        Order.updateOne({idDraw: param }, {$set: {
            purcheser: req.body.purcheser,
            itemName:  req.body.detailName,
            idDraw: req.body.orderID,
            material: req.body.Material
        }},function(err, response){
            res.json(response);
        })
    }

}
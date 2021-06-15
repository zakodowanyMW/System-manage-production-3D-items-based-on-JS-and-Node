const mongoose = require('mongoose');

const Order = mongoose.model('Order', { 
    purcheser: String,
    itemName: String,
    idDraw: String,
    material: String
});

module.exports = Order;

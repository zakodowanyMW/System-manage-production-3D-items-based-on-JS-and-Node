const mongoose = require('mongoose');
require('./dbModels');
const {database} =require('../config')

mongoose.connect(database, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

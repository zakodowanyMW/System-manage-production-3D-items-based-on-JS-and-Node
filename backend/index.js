const express = require('express');
const app = express();
const {port} = require('./config.js');
const { use } = require('./routes/api');
const apiRouter = require('./routes/api');

app.use("/",apiRouter)


app.listen(port, () => {
    console.log("Server is running on port 3001");
})
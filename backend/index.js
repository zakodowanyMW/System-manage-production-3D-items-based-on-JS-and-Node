const express = require('express');
const app = express();
const {port} = require('./config.js');

app.get("/", (req, res) => {

    res.send("Server run");
})


app.listen(port, () => {
    console.log("Server is running on port 3001");
})
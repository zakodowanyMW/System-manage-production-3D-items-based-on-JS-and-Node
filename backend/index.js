const express = require('express');
const app = express();
const {port} = require('./config.js');
const apiRouter = require('./routes/api');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./database/dbConnect');

app.use(cors());

app.use(bodyParser.json());

app.use("/",apiRouter);

app.listen(port, () => {
    console.log("Server is running on port 3001");
})
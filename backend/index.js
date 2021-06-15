const express = require('express');
const app = express();
const {port} = require('./config.js');
const apiRouter = require('./routes/api');
const cors = require('cors');

require('./database/dbConnect');

app.use(cors());
app.use("/",apiRouter);

//test
const dane = {
    imie: "Marcin",
    nazwisko: "Winiarski"
}
app.get("/test", (req, res) => {
    res.json(dane);
})

app.listen(port, () => {
    console.log("Server is running on port 3001");
})
const express = require('express');
const cors = require('cors');
const config = require('app/config/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors());
app.use("/", (req, res) => {
    res.json({ message: " Hello world!!" })
});

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
});
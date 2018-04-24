require('dotenv').config();
const express = require("express"),
     bodyParser = require("body-parser"),
     cors = require('cors');
     
var app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(express.static(__dirname + "../../dist"));

const NODE_PORT = process.env.PORT;

app.listen(NODE_PORT, function () {
    console.info("App server started on port " + NODE_PORT);
});

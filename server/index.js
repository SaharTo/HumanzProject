const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const methodOverride = require("method-override");
const path = require('path')
const clientController = require("./clientController");
const clientModel = require("./clientModel");
require("dotenv").config();



require("dotenv").config();
const port = 3030

//connect to DB
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", (_) => {
    console.log("Database connected:", dbUrl);
});
//check for DB errors
db.on("error", (err) => {
    console.error("connection error:", err);
});

// for front accses
const corsOptions = {
    origin: [
        /* "http://127.0.0.1:3000",
         "http://localhost:3000",*/ //if i want to specify the frontend origin
        '*',
    ],
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.set("trust proxy", 1);

app.use(cors(corsOptions));
app.use(express.json()); // to parse the incoming requests with JSON payloads

app.use(express.urlencoded({ extended: true }));

app.use("/clients/", require("./clientRoute"));


app.listen(port, function () {
    console.log("listening on port ", port);
});
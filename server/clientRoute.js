const express = require("express");
const router = express.Router();
const clients = require("./clientController");

router
    .route("/")
    .get(clients.index)
    .post(clients.addClient);

router
    .route("/:id")
    .get(/*controller to show info about specific client*/)
    .delete(clients.deleteClient)


module.exports = router;

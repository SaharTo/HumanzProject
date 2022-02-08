const Client = require("./clientModel")

module.exports.index = async (req, res) => {
    //console.log("inside index controller");
    const clients = await Client.find({});
    res.send(clients)
};


module.exports.deleteClient = async (req, res) => {
    //console.log("delete client controller");
    const { id } = await req.params;
    //console.log("inside deleteClient func, id: ", id);
    try {
        await Client.findByIdAndDelete(id);
        res.send("לקוח נמחק");
    } catch (e) {
        console.log("just check if it came here");
        console.log(e);
        res.status(401).send(e);
    }
};

module.exports.addClient = async (req, res) => {
    console.log("inside addclient controller");

    console.log(req.body.client);
    const client = await new Client(req.body.client);
    console.log(client);
    try {

        await client.save();
        res.send(client);
    } catch (e) {
        res.status(401).send(e);
    }
};

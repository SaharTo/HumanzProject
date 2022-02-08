import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Button, Card } from 'react-bootstrap'


export class IndexClients extends Component {
  state = {
    clients: null,
  };
  componentDidMount() {
    this.getClients();
  }
  /*componentDidUpdate() {
    console.log("didupdate");
  }*/
  goBack = () => {
    this.props.history.push("/");
  };
  getClients = async () => {
    fetch("http://localhost:3030/clients/", { credentials: "include" })
      .then((res) => res.json())
      .then((clients) => {
        this.setState({ clients });
      })
      .catch((err) => {
        alert(err);
      });
  };

  getIpLocation = async (ip) => {
    fetch(`http://ip-api.com/json/${ip}`,)
      .then((res) => res.json())
      .then((location) => {
        //console.log(location.country)
        if (!location.country) alert("IP adress not found ")
        alert(`This IP is located in:  ${location.country}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  deleteClient = async (id) => {
    fetch(`http://localhost:3030/clients/${id}`, { method: "DELETE", credentials: "include" })
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        alert(err);
      });
  }



  render() {
    const { clients } = this.state;
    if (!clients) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="auto">
        <Button variant="secondary" onClick={this.goBack}>Go Back</Button>
        <h1 className="title">Welcome To Humanz Client's List</h1>

        <div dir="rtl" className="container">

          {clients.map((client) => (

            <Card key={client._id} style={{ width: '18rem' }}>
              <Button className="deleteBtn" variant="danger" onClick={() => this.deleteClient(client._id)}>X</Button>
              <Card.Body dir="ltr">
                <Card.Title>{client.fullName}</Card.Title>
                <Card.Text> ID: {client.clientId}</Card.Text>
                <Card.Text>Phone Number: {client.phoneNumber}</Card.Text>
                <Card.Text>IP Adress : {client.ipAdress}</Card.Text>
                <Button className="btn" variant="warning" onClick={() => this.getIpLocation(client.ipAdress)}>Check for the IP location</Button>

              </Card.Body>
            </Card>

          ))}

          {/*<div dir="rtl" className="preview" key={client._id}>
              <p>שם לקוח: {client.fullName}</p>
              <p>תעודת זהות: {client.clientId}</p>
              <p>IP כתובת : {client.ipAdress}</p>
              <p>מספר טלפון: {client.phoneNumber}</p>
              <button onClick={() => this.deleteClient(client._id)}>מחק</button>

            </div>*/}

        </div>

      </div >
    );
  }
}

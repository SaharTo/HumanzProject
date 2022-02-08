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

  filterFunction() {
    // Declare variables
    var input, filter, div, card, cardBody, tr, cardTitle, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    //console.log("filter: ", filter)
    div = document.getElementById("myDiv");
    card = div.getElementsByClassName("card");
    //console.log("cards : ", card);
    //console.log("div : ", div);

    for (i = 0; i < card.length; i++) {
      //console.log("this is the card: ", card[i])
      cardBody = card[i].getElementsByClassName("card-body");
      //console.log("this is the card body: ", cardBody)

      cardTitle = card[i].getElementsByClassName("card-title");
      //console.log("this is the card title: ", cardTitle);
      if (cardTitle) {
        txtValue = cardTitle[0].textContent || cardTitle.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          card[i].style.display = "";
        } else {
          card[i].style.display = "none";
        }
      }
    }
  }

  render() {
    const { clients } = this.state;
    if (!clients) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="auto">
        <Button variant="secondary" onClick={this.goBack}>Go Back</Button>
        <h1 className="title">Welcome To Humanz Client's List</h1>
        <input autoComplete="off" className="searchInput" type="text" id="myInput" onKeyUp={this.filterFunction} placeholder="Search for names.."></input>

        <div dir="rtl" className="container" id="myDiv">

          {clients.map((client) => (

            <Card id={client._id} key={client._id} style={{ width: '18rem' }}>
              <Button className="deleteBtn" variant="danger" onClick={() => this.deleteClient(client._id)}>X</Button>
              <Card.Title>{client.fullName}</Card.Title>
              <Card.Body dir="ltr">
                <Card.Text> ID: {client.clientId}</Card.Text>
                <Card.Text>Phone Number: {client.phoneNumber}</Card.Text>
                <Card.Text>IP Adress : {client.ipAdress}</Card.Text>
                <Button className="btn" variant="warning" onClick={() => this.getIpLocation(client.ipAdress)}>Check for the IP location</Button>

              </Card.Body>
            </Card>

          ))}

        </div>

      </div >
    );
  }
}

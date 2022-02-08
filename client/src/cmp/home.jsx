import { Link } from "react-router-dom";
import React, { Component } from "react";


export class Home extends Component {
  render() {
    return (
      <div className="homeDiv" dir="auto">
        <h1>Welcome To Humanz Clients App</h1>
        <h1>By</h1>
        <h1>Sahar Toledano</h1>
        <Link to={"/add"}>
          <h2 className="hLink">Add A Client</h2>
        </Link>
        <Link to={"/show"}>
          <h2 className="hLink"> Existing Clients</h2></Link>

      </div>
    );
  }
}

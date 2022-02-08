import { Link } from "react-router-dom";
import React, { Component, useState } from "react";
import { Button } from 'react-bootstrap/'


export class AddClient extends Component {
    state = { client: '' }

    componentDidMount() {
        const client = { fullName: "", clientId: "", ip: "", phone: "" }
        this.setState({ client });
    }
    goBack = () => {
        this.props.history.push("/");
    };
    handleChange = ({ target }) => {
        const field = target.id;
        const value = target.value;
        //console.log("field: " + field + " value: " + value);
        this.setState((prevState) =>
        ({
            client: { ...prevState.client, [field]: value }
        })
        );
    };


    addClient = async (ev) => {
        ev.preventDefault();
        //console.log("Inside addClient function");
        fetch(`http://localhost:3030/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ client: this.state.client }),
        })
            .then((res) => {
                if (res.ok) {
                    //console.log("everything is ok");
                    res.text().then((data) => {
                        alert("client added successfully")
                        this.goBack();
                    });
                } else res.text().then((msg) => {
                    alert(msg);
                });
            });
    }

    render() {
        const { client } = this.state;
        // console.log(client);
        if (!client) return <h1 dir="rtl">טוען...</h1>;
        return (
            <div>
                <Button variant="secondary" onClick={this.goBack}>Go Back</Button>
                <form className="addClientForm" onSubmit={this.addClient}>
                    <h1>Add Client</h1>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        className='input'
                        type="text"
                        //value={client.fullName}
                        id="fullName"
                        name="fullName"
                        onChange={this.handleChange}
                        pattern="^(\w\w+)\s(\w+)$"
                        title="שדה זה חייב לכלול שם פרטי ושם משפחה"
                        required
                    />
                    <label htmlFor="clientId">ID:</label>
                    <input
                        className='input'
                        type="text"
                        //value={client.clientId}
                        id="clientId"
                        name="clientId"
                        onChange={this.handleChange}
                        pattern=".{4,9}"
                        title="שדה זה חייב לכלול בין 4 ל-9 ספרות (כולל ספרת ביקורת)"
                        required
                    />
                    <label htmlFor="ip">IP Adress:</label>
                    <input
                        className='input'
                        type="text"
                        //value={client.ipAdress}
                        id="ipAdress"
                        name="ip"
                        onChange={this.handleChange}
                        pattern="((^|\.)((25[0-5]_*)|(2[0-4]\d_*)|(1\d\d_*)|([1-9]?\d_*))){4}_*$"
                        title="שדה זה חייב לכלול כתובת IP תקנית"
                        required

                    />
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        className='input'
                        type="tel"
                        //value={client.phoneNumber}
                        id="phoneNumber"
                        name="phone"
                        onChange={this.handleChange}
                        pattern="[0-9]{3}-[0-9]{9}"
                        title="שדה זה חייב לכלול קידומת (3 ספרות) + 9 ספרות. כך לדוגמא: 972-521313774"
                        required
                    />
                    <button className="btnAdd">Add</button>
                </form>

            </div>
        );
    }
}

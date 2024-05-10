import React, { useState, useEffect } from "react";
//import Table from "../Components/Table";
import Auth from "../Components/Auth";
import "../Styles/Navbar.css";

function Inventory() {
  function authenticateUser(user) {
    console.log(user)
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(response => response.text())
    .then(token => {
      // Here, 'token' contains the JWT token sent from the server
      console.log(token);
    });
  }
  return (
    <div className="ProductList">
    <h1>Login Page:</h1>
      <Auth handleSubmit={authenticateUser} />
    </div>
  );
}

export default Inventory;

import React, { useState, useEffect } from "react";
//import Table from "../Components/Table";
import Auth from "../Components/Auth";
import "../Styles/Navbar.css";
import Cookies from 'js-cookie';

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
      Cookies.set('safeHaveToken', token, {
        expires: 24/24, // 1 hour in days
        path: '/', // cookie path
        secure: false, // set to true if using HTTPS
        sameSite: 'strict' // or 'lax' depending on your requirements
      });
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

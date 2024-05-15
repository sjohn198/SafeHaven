import React, { useState, useEffect } from "react";
import Auth from "../Components/Auth";
import "../Styles/Navbar.css";
import Cookies from "js-cookie"

function Inventory() {
  function createUser(user) {
    console.log(user)
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(response => response.text())
    .then(token => {
      // Here, 'token' contains the JWT token sent from the server
      console.log(token);
      Cookies.set('safeHavenToken', token, {
        expires: 24/24, // 1 hour in days
        path: '/', // cookie path
        secure: false, // set to true if using HTTPS
        sameSite: 'strict' // or 'lax' depending on your requirements
      });
    });
  }
  return (
    <div className="ProductList">
    <h1>Signup Page:</h1>
      <Auth handleSubmit={createUser} />
    </div>
  );
}

export default Inventory;

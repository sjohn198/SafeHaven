import React, { useState, useEffect } from "react";
import Auth from "../Components/Auth";
import "../Styles/Navbar.css";

function Inventory() {
  function createUser(user) {
    console.log(user)
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

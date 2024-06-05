import React, { useState, useEffect } from "react";
import Auth from "../Components/Auth";
import "../Styles/Navbar.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  function createUser(user) {
    console.log(user);
    fetch("safehaven307.azurewebsites.net/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((response) => {
        if (!response.ok) {
          // Handle the case where the server returns an error
          alert("Username already taken");
          throw new Error("Username already taken");
        }
        return response.text();
      })
      .then((token) => {
        // Here, 'token' contains the JWT token sent from the server
        console.log(token);
        Cookies.remove("safeHavenToken");
        Cookies.set("safeHavenToken", token, {
          expires: 24 / 24, // 1 hour in days
          path: "/", // cookie path
          secure: false, // set to true if using HTTPS
          sameSite: "strict" // or 'lax' depending on your requirements
        });
        navigate("/inventory");
      });
  }
  return (
    <div className="ProductList">
      <h1>Signup Page:</h1>
      <Auth handleSubmit={createUser} />
    </div>
  );
}

export default Signup;

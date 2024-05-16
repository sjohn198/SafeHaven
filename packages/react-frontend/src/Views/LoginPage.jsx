import React, { useState, useEffect } from "react";
//import Table from "../Components/Table";
import Auth from "../Components/Auth";
import "../Styles/Navbar.css";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  function authenticateUser(user) {
    console.log(user)
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(response => {
      if (!response.ok) {
        // Handle the case where the server returns an error
        throw new Error('Invalid username/password');
      }
    return response.text();
    }).then(token => {
      Cookies.remove('safeHavenToken');
      // Here, 'token' contains the JWT token sent from the server
      Cookies.set('safeHavenToken', token, {
        expires: 24/24, // 1 hour in days
        path: '/', // cookie path
        secure: false, // set to true if using HTTPS
        sameSite: 'strict' // or 'lax' depending on your requirements
      });
      console.log(token);
      console.log(Cookies.get('safeHavenToken'));
      navigate('/inventory');
    });
  }
  return (
    <div className="ProductList">
    <h1>Login Page:</h1>
      <Auth handleSubmit={authenticateUser} />
    </div>
  );
}

export default Login;

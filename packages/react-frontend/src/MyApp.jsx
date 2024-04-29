import React, { useState, useEffect } from "react";
import Table from "./Table";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Inventory from "./Inventory";
import Form from "./Form";
import NavBar from "./Navbar"
import "./MyApp.css";

function MyApp() {
  return (
      <NavBar/>
  );
}
export default MyApp;

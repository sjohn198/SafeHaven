import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inventory from "../Views/Inventory";
import LoginPage from "../Views/LoginPage";
import SignUpPage from "../Views/SignUpPage";
import Logout from "../Components/Logout";
import ManageOrders from "../Views/ManageOrders";
import AddOrders from "../Views/AddOrders";
import OrderStatistics from "../Views/OrderStatistics";
import ProfilePage from "../Views/Profile";
import ProductPage from "../Views/ProductPage";
import AboutUs from "../Views/AboutUs";
import TermsAndConds from "../Views/TermsAndConds";
import EditProfile from "../Views/EditProfile";

import "../Styles/Navbar.css";

function App() {
  const user = {
    id: "663340b898b86ea44965feb0"
  };
  return (
    <Router id="router">
      <NavBar />
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/manage-orders" element={<ManageOrders />} />
        <Route path="/add-orders" element={<AddOrders />} />
        <Route path="/statistics" element={<OrderStatistics />} />
        <Route path="/profile" element={<ProfilePage user_id={user} />} />
        <Route path="/profile/edit" element={<EditProfile/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/terms-and-conditions" element={<TermsAndConds/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

function NavBar() {
  const [src, setSrc] = useState('yes.png');

  useEffect(() => {
    const img = new Image();
    img.onload = () => setSrc('../yes.png');
    img.onerror = () => setSrc('yes.png');
    img.src = '../yes.png';
  }, []);

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <a href="/">
              <img className="logo" src={src} alt="Logo"/>
            </a>
          </li>
          <li className="hover">
            <Link to="/inventory">Inventory</Link>
          </li>
          <li className="dropdown">
            <a>Orders</a>
            <ul className="dropdown-content">
              <li className="dropdown-item">
                <Link to="/statistics">View Order Statistics</Link>
              </li>
              <li className="dropdown-item">
                <Link to="/manage-orders">Manage Orders</Link>
              </li>
              <li className="dropdown-item">
                <Link to="/add-orders">Add Orders</Link>
              </li>
            </ul>
          </li>
          <div className="left">
            <li className="hover">
              <Link to="/signup">Sign up</Link>
            </li>
            <li className="hover">
              <Link to="/login">Login</Link>
            </li>
            <li className="hover">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover">
              <Link to="/logout">Logout</Link>
            </li>
          </div>
        </ul>
        <div className="whiteBlock">
          <h1 className="title">Welcome to Safe Haven</h1>
        </div>
      </nav>
    </div>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <Link to="/about-us">About Us</Link>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
        </div>
        <div className="footer-right">
          <p>&copy; CSC 307 Spring 2024</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div>
    <h1 className="title">Home page</h1>
    <div className="widgets">
      <div className="widget-square">
        <Link to="/inventory">
          <h3>Inventory</h3>
        </Link>
      </div>
      <div className="widget-square">
        <Link to="/manage-orders">
          <h3>Manage Orders</h3>
        </Link>
      </div>
      <div className="widget-square">
        <Link to="/add-orders">
          <h3>Add Orders</h3>
        </Link>
      </div>
      <div className="widget-square">
        <Link to="/statistics">
          <h3>Order Statistics</h3>
        </Link>
      </div>
    </div>
  </div>
  );
}

export default App;

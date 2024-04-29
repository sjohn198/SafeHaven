import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inventory from './Inventory';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ManageOrders from './ManageOrders';
import ViewOrders from './ViewOrders';
import OrderStatistics from './OrderStatistics';
import './MyApp.css';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/manage-orders" element={<ManageOrders />} />
                <Route path="/view-orders" element={<ViewOrders />} />
                <Route path="/statistics" element={<OrderStatistics />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

function NavBar() {
    return (
        <div className="container">
            <nav className="navbar">
                <ul className="nav-list">
                <li><Link to="/" style={{ textDecoration: 'none', color: 'red' }}>Safe Haven Logo Her</Link></li>
                <li><Link to="/inventory">Inventory</Link></li>
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
                                <Link to="/view-orders">&nbsp;&nbsp; View Orders</Link>
                            </li>
                        </ul>
                    </li>
                    <div className="left">
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </div>
                </ul>
                <div className="whiteBlock">
                        <h1 className="title">Welcome to Safe Haven</h1>
                </div>
            </nav>
        </div>
    );
}

function HomePage() {
    return <h1 className="title">Home page</h1>;
}

export default App;
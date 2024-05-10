import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inventory from '../Views/Inventory';
import LoginPage from '../Views/LoginPage';
import SignUpPage from '../Views/SignUpPage';
import ManageOrders from '../Views/ManageOrders';
import AddOrders from '../Views/AddOrders';
import OrderStatistics from '../Views/OrderStatistics';
import ProfilePage from '../Views/Profile';
import '../Styles/Navbar.css';


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


function App() {    
    const user = {
        id: "663340b898b86ea44965feb0"
    };
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/manage-orders" element={<ManageOrders />} />
                <Route path="/add-orders" element={<AddOrders />} />
                <Route path="/statistics" element={<OrderStatistics />} />
                <Route path="/profile" element={<ProfilePage user_id={user}/>} />
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
                <li><Link to="/" style={{ textDecoration: 'none', color: 'red' }}>Safe Haven Logo Here</Link></li>
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
                                <Link to="/add-orders">&nbsp;&nbsp;&nbsp;Add Orders</Link>
                            </li>
                        </ul>
                    </li>
                    <div className="left">
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
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
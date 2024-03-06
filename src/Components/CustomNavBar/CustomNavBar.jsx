import React, { useEffect, useState } from 'react';
import './CustomNavBar.css'; // Import your CSS file for Navbar styling
import { Link, useLocation } from 'react-router-dom';

const CustomNavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState({})
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const location = useLocation();

    const getUser = async () => {
        const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        setUser(parsedUser)
    }

    useEffect(() => {
        getUser()
    }, [location])


    return (
        <nav className="custom-navbar">
            <div className="custom-navbar-container">
                <div className="custom-navbar-logo">
                    <Link to="/">AMORE</Link>
                </div>
                <ul className={`custom-navbar-menu ${showMenu ? 'active' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    {/* <li><Link to="/">Blogs</Link></li>
                    <li><Link to="/">Contact</Link></li> */}
                    <li><Link to="/Pricing">Pricing</Link></li>
                    {user && (
                        <li><Link to="/UserDashboard">User</Link></li>
                    )}
                    {!user && (<>
                        <li><Link to="/SignUp">Signup</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </>
                    )}
                    {/* <li className="dropdown">
                        <Link to="/">Categories</Link>
                        <div className="dropdown-content">
                            <Link to="/">Category 1</Link>
                            <Link to="/">Category 2</Link>
                            <Link to="/">Category 3</Link>
                        </div>
                    </li> */}
                </ul>
                <div className="custom-login-signup-icons">
                    {/* <Link to="/">Home</Link> */}
                    {/* <Link to="/BlogsData">Blogs</Link> */}
                    {/* <Link to="/Login">Login</Link> 
                <Link to="/SignUp">Signup</Link>
                <Link to="/Pricing">Pricing</Link>
                <Link to="/UserDashboard">User</Link>  */}


                </div>
                <div className="custom-menu-icon" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </nav>
    )
};

export default CustomNavBar;

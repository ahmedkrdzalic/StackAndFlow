import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export function Nav() {
    const { user, setUser } = useContext(UserContext);

    const logout_handle = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        setUser(null);
    }


    let menu;

    if (user) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/myprofile" className="nav-link">My Profile</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={logout_handle}>Logout</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    }


    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">StackAndFlow</Link>
                    
                    
                    <div className="navbar-collapse" id="navbarsExample07">
                        {menu}
                    </div>
                        
                    
                </div>
            </nav>
        </div>
    );
}
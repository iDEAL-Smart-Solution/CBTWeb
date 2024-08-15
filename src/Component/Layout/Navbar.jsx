import React from 'react';
import './layout.css'
import { useAuth } from '../../Zustand/auth';

export default function Navbar() {
     const { logout } = useAuth();
     function handleSignOut(){
          logout();
     }
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="path-to-logo.png" alt="" />
                <span className='color-primary'>School Name</span>
            </div>
            <button onClick={handleSignOut} className="signout-button">
                Sign Out
            </button>
        </nav>
    );
}

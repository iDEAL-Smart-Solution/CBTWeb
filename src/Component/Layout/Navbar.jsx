import React from 'react';
import './layout.css'
import { useAuth } from '../../Zustand/auth';

export default function Navbar() {
    const { logout, auth } = useAuth();
    const { academicSession } = auth;
    const { current_Session, current_Term } = academicSession;
    function handleSignOut() {
        logout();
    }
    const termMap = {
        1: "1st_term",
        2: "2nd_term",
        3: "3rd_term",
    };
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="path-to-logo.png" alt="" />
                <span className='color-primary'>School Name</span>
            </div>
            <div>
                <div>
                    <small className='bolder color-primary'>{current_Session}</small>
                    {/* <small className='bolder color-primary'>2022/2023</small> */}

                </div>
                <div>
                   <b className='bolder'>
                   <small className='bolder color-primary bolder'>{termMap[current_Term]}</small>
                   {/* <small className='bolder color-primary bolder'>2nd_Term</small> */}

                   </b>
                </div>
            </div>
            <div>
                <button onClick={handleSignOut} className="signout-button">
                    Sign Out
                </button>
            </div>
        </nav>
    );
}

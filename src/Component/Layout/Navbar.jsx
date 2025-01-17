import React from 'react';
import './layout.css'
import { useAuth } from '../../Zustand/auth';
import { SCHOOL_NAME } from '../../Constant';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAcad } from '../../Zustand/acad_session';

export default function Navbar() {
    const { logout, auth } = useAuth();
    const { academicSession } = auth;
    const { current_Session, current_Term } = academicSession;
    const { acad } = useAcad();
    const { nameAndLogo } = acad;
    const { name } = nameAndLogo || {};
    const navigate = useNavigate();
    function handleSignOut() {
        logout();
        navigate('/');

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
                <span className='color-primary'>{name || SCHOOL_NAME}</span>
            </div>
            <div>
                <Link to="/edit-academic-session" className="text-dec-none" >
                    <div>
                        <small className='bolder color-primary'>{current_Session}</small>

                    </div>
                    <div>
                        <small className='bolder color-primary bolder'>{termMap[current_Term]}</small>
                    </div>
                </Link>
            </div>
            <div>
                <button onClick={handleSignOut} className="signout-button">
                    Sign Out
                </button>
            </div>
        </nav>
    );
}

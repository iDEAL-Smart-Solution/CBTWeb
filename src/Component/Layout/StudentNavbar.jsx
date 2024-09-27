import React from 'react';
import './layout.css'
import { useAuth } from '../../Zustand/auth';
import { BASE_URL } from '../../Constant';
import { SCHOOL_NAME } from '../../Constant';
import { useNavigate } from 'react-router-dom';

export default function StudentNavbar() {
    const { logout, auth } = useAuth();
    const navigate = useNavigate();
    const { academicSession, user } = auth;
    const { current_Session, current_Term } = academicSession;
    function handleSignOut() {
        navigate('/');
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
                <span className='color-primary'>{SCHOOL_NAME}</span>
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
            <div className='student-settings'>
                <div>
                    <small className='bolder'>{user.firstName ? user.firstName : ''}</small>
                </div>
                <div>
                    <img src={`${BASE_URL}/ProfilePictures/${user.profilePicture}`} width="50em" alt="image" />
                </div>
                <button onClick={handleSignOut} className="signout-button">
                    Sign Out
                </button>
            </div>
        </nav>
    );
}

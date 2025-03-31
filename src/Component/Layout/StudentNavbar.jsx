import React from 'react';
import './layout.css'
import { useAuth } from '../../Zustand/auth';
import { BASE_URL } from '../../Constant';
import { SCHOOL_NAME } from '../../Constant';
import { useNavigate } from 'react-router-dom';
import { useAcad } from '../../Zustand/acad_session';
import defaultLogo from '../../assets/iDEAL-logo.jpg';

export default function StudentNavbar() {
    const { logout, auth } = useAuth();
    const navigate = useNavigate();
    const { academicSession, user } = auth;
  const { current_Session, current_Term, logoUrl, schoolName } = academicSession || {};
    const { firstName, profilePicture } = user || {};

    function handleSignOut() {
        logout();
        navigate('/');
    }
    const termMap = {
        1: "1st_term",
        2: "2nd_term",
        3: "3rd_term",
    };
      const myLogoUrl = logoUrl ? `${BASE_URL}/ProfilePictures/${logoUrl}` : defaultLogo;
    return (
        <nav className="navbar">
            <div className="navbar-logo">
        <img
          src={myLogoUrl}
          alt="School Logo"
          onError={(e) => {
            e.target.src = defaultLogo;
          }} /> 
           <span className='color-primary'>{schoolName || SCHOOL_NAME}</span>
      </div>
            <div>
                <div>
                    {current_Session && <small className='bolder color-primary'>{current_Session}</small>}
                </div>
                <div>
                    <b className='bolder'>
                    {current_Term && <small className='bolder color-primary bolder'>{termMap[current_Term]}</small> }
                    </b>
                </div>
            </div>
            <div className='student-settings'>
                <div>
                    {firstName && <small className='bolder'>{firstName}</small>}
                </div>
                <div>
                   {profilePicture &&  <img src={`${BASE_URL}/ProfilePictures/${user.profilePicture}`} style={{borderRadius: '50%'}} width="50em" alt="image" />}
                </div>
                <button onClick={handleSignOut} className="signout-button">
                    Sign Out
                </button>
            </div>
        </nav>
    );
}

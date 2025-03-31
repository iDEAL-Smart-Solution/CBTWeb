import React, { useEffect } from 'react';
import './layout.css';
import { useAuth } from '../../Zustand/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Constant';
import defaultLogo from '../../assets/iDEAL-logo.jpg';

export default function Navbar() {
  const { logout, auth } = useAuth();
  const { academicSession } = auth || {};
  const { current_Session, current_Term, logoUrl, schoolName } = academicSession || {};
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
           <span className='color-primary'>{schoolName || name}</span>
      </div>
      <div>
        <Link to="/edit-academic-session" className="text-dec-none">
          <div>
            <small className="bolder color-primary">{current_Session}</small>
          </div>
          <div>
            <small className="bolder color-primary bolder">{termMap[current_Term]}</small>
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
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Zustand/auth';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../../Constant';
import defaultLogo from '../../assets/iDEAL-logo.jpg';

export default function Navbar() {
  const { logout, auth } = useAuth();
  const { academicSession, user } = auth || {};
  const { current_Session, current_Term, logoUrl, schoolName } = academicSession || {};
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  const isDevRole = user?.role === 4;

  useEffect(() => {
    if (isDevRole) {
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isDevRole]);

  function handleSignOut() {
    logout();
    navigate('/');
  }

  const termMap = {
    1: "1st Term",
    2: "2nd Term",
    3: "3rd Term",
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const myLogoUrl = logoUrl ? `${BASE_URL}/ProfilePicture/${logoUrl}` : defaultLogo;
  const displaySchoolName = isDevRole ? 'Hi, Bigboss' : (schoolName || 'School Name');

  return (
    <nav className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2 md:space-x-4">
        <img
          src={myLogoUrl}
          alt="School Logo"
          className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-md"
          onError={(e) => {
            e.target.src = defaultLogo;
          }}
        />
        <span className="text-lg font-bold text-blue-600 md:block hidden">
          {displaySchoolName}
        </span>
      </div>

      <div className="text-center text-sm md:text-base mt-2 md:mt-0">
        {isDevRole ? (
          <div className="text-blue-600 font-semibold">
            <small className="block text-sm md:text-base">
              {formatDate(currentDateTime)}
            </small>
            <small className="block text-sm md:text-base">
              {formatTime(currentDateTime)}
            </small>
          </div>
        ) : (
          <Link to="/edit-academic-session" className="no-underline">
            <small className="text-blue-600 font-semibold block text-sm md:text-base">
              {current_Session || 'N/A'}
            </small>
            <small className="text-blue-600 font-semibold block text-sm md:text-base">
              {termMap[current_Term] || 'N/A'}
            </small>
          </Link>
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={handleSignOut}
          className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm md:text-base"
        >
          Sign Out
        </button>
      </div>
    </nav>

  );
}
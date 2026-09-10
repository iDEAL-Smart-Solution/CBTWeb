import React from 'react';
import { useAuth } from '../../Zustand/auth';
import { BASE_URL } from '../../Constant';
import { SCHOOL_NAME } from '../../Constant';
import { useNavigate } from 'react-router-dom';
import defaultLogo from '../../assets/iDEAL-logo.png';

export default function StudentNavbar() {
    const { logout, auth } = useAuth();
    const navigate = useNavigate();
    const { academicSession, user } = auth || {};
    const { current_Session, current_Term, logoUrl, schoolName } = academicSession || {};
    const { firstName, profilePicture } = user || {};

    function handleSignOut() {
        logout();
        navigate('/');
    }

    const termMap = {
        1: "1st Term",
        2: "2nd Term",
        3: "3rd Term",
    };

    const myLogoUrl = logoUrl ? `${BASE_URL}/ProfilePicture/${logoUrl}` : defaultLogo;

    return (
        <nav className="bg-white shadow-lg p-2 z-10">
            <div className="max-w-8xl mx-auto flex items-center justify-between w-full">
                <div className="flex items-center space-x-2 md:space-x-4">
                    <img
                        src={myLogoUrl}
                        alt="School Logo"
                        className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-md"
                        onError={(e) => {
                            e.target.src = defaultLogo;
                        }}
                    />
                    <span className="text-lg font-bold text-blue-600 hidden md:block">
                        {schoolName || SCHOOL_NAME}
                    </span>
                </div>

                <div className="text-center text-sm md:text-base">
                    <span className="text-blue-600 font-semibold block">
                        {current_Session || 'N/A'}
                    </span>
                    <span className="text-blue-600 font-semibold block">
                        {termMap[current_Term] || 'N/A'}
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    {firstName && (
                        <span className="text-sm font-medium text-gray-800 hidden md:block">
                            {firstName}
                        </span>
                    )}
                    {profilePicture && (
                        <img
                            src={`${BASE_URL}/ProfilePicture/${profilePicture}`}
                            alt={`${firstName}'s profile`}
                            className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                            onError={(e) => (e.target.src = defaultLogo)}
                        />
                    )}
                    <button
                        onClick={handleSignOut}
                        className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
}
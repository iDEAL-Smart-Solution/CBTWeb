import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../../Component/Layout/StudentNavbar';

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 relative z-0">
      <div className="sticky top-0 z-10 bg-white shadow-lg">
        <StudentNavbar />
      </div>
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
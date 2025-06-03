import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Component/Layout/Navbar';
import Sidebar from '../../Component/Layout/Sidebar';

export default function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex bg-gray-100 flex-col overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white p-2 z-70">
        <div className="flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 focus:outline-none mr-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <Navbar />
        </div>
      </header>

      {/* Main layout below navbar */}
      <div className="flex flex-1 pt-[50px] overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

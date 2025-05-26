// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from '../../Component/Layout/Navbar';
// import Sidebar from '../../Component/Layout/Sidebar';

// export default function Root() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow p-2 md:p-4 z-40">
//         <div className="flex justify-between items-center">
//           <button
//             onClick={toggleSidebar}
//             className="md:hidden text-gray-600 focus:outline-none mr-2"
//           > 
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           </button>
//           <Navbar />
//         </div>
//       </header>

//       <div className="pt-[70px] md:pt-[80px] flex flex-row min-h-screen overflow-hidden">

//         <div
//           className={`fixed top-[70px] md:top-[80px] h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] w-64 ...
//                  w-64 md:w-64 md:static bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto ${sidebarOpen ? 'translate-x-0 z-30' : '-translate-x-full md:translate-x-0 z-20'
//             }`}
//         >
//           <Sidebar />
//         </div>

//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-opacity-50 z-10 md:hidden"
//             onClick={toggleSidebar}
//           ></div>
//         )}

//         <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
//           <Outlet />
//           {/* <ColorPicker /> */}
//         </main>
//       </div>
//     </div>
//   );
// }








// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from '../../Component/Layout/Navbar';
// import Sidebar from '../../Component/Layout/Sidebar';

// export default function Root() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar with toggle button */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow p-2 md:p-4 z-40">
//         <div className="flex justify-between items-center">
//           {/* Sidebar toggle button only here */}
//           <button
//             onClick={toggleSidebar}
//             className="md:hidden text-gray-600 focus:outline-none mr-2"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           </button>
//           <Navbar />
//         </div>
//       </header>

//       <div className="pt-[70px] md:pt-[80px] flex flex-row min-h-screen overflow-hidden">

//         {/* Sidebar controlled by sidebarOpen state */}
//         <div
//           className={`fixed top-[70px] md:top-[80px] h-[calc(100vh-70px)] md:h-[calc(100vh-80px)] w-64 md:static bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto
//           ${sidebarOpen ? 'translate-x-0 z-30' : '-translate-x-full md:translate-x-0 z-20'}`}
//         >
//           <Sidebar onClose={() => setSidebarOpen(false)} />
//         </div>

//         {/* Overlay when sidebar is open on small screens */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
//             onClick={toggleSidebar}
//           ></div>
//         )}

//         <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }








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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow p-2 md:p-4 z-50">
        <div className="flex justify-between items-center">
          {/* Sidebar toggle for mobile */}
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

      {/* Main content */}
      <div className="pt-[70px] md:pt-[80px] flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Outlet for page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

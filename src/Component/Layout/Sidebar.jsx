import React from 'react';
import { useAuth } from "../../Zustand/auth";
import { NavLink, useLocation } from "react-router-dom";
import {
  Book, UserPlus, Users, Clipboard, Plus,
  FileUp, List, BarChart2, Settings, MessageSquare, School, HardDrive
} from 'lucide-react';

const navLinksItem = [
  {
    name: "Class",
    subLinks: [
      { link: "/class", name: "Classes", icon: <Clipboard size={20} /> }
    ]
  },
  {
    name: "Staff",
    subLinks: [
      { link: "/staff", name: "Staff", icon: <Users size={20} /> }
    ]
  },
  {
    name: "Student",
    subLinks: [
      { link: "/students", name: "Students", icon: <Users size={20} /> }
    ]
  },
  {
    name: "Subject",
    subLinks: [
      { link: "/subjects", name: "Subjects", icon: <Book size={20} /> },
      { link: "/staff/subjects", name: "My Subjects", icon: <List size={20} /> }
    ]
  },
  {
    name: "Questions",
    subLinks: [
      { link: "/question/create", name: "Create", icon: <Plus size={20} /> },
      { link: "/passage", name: "Passage", icon: <FileUp size={20} /> }
    ]
  },
  {
    name: "Examination",
    subLinks: [
      { link: "/exams", name: "Exams", icon: <Clipboard size={20} /> },
      { link: "/staff/exams", name: "My Exams", icon: <List size={20} /> },
      { link: "/student-clearance", name: "Exam Clearance", icon: <Settings size={20} /> },
    ]
  },
  {
    name: "Result",
    subLinks: [
      { link: "/results", name: "Check Results", icon: <BarChart2 size={20} /> },
      { link: "/upload-thoery-score", name: "Upload Score", icon: <FileUp size={20} /> }
    ]
  },
  {
    name: "Setting",
    subLinks: [
      { link: "/student-promotion", name: "Promote / Demote", icon: <Settings size={20} /> },
      { link: "/edit-academic-session", name: "Academic Settings", icon: <Settings size={20} /> },
    ]
  },
  {
    name: "Feedback",
    subLinks: [
      { link: "/send-feedback", name: "Send", icon: <MessageSquare size={20} /> }
    ]
  },
  {
    name: "Administration",
    subLinks: [
      { link: "/schools", name: "Schools", icon: <School size={20} /> },
      { link: "/admin-users", name: "Admin Users", icon: <Users size={20} /> }
    ]
  },
  {
    name: "System",
    subLinks: [
      { link: "/backup-settings", name: "Database Backup", icon: <HardDrive size={20} /> },
      { link: "/migrate-students", name: "Migrate Students", icon: <Users size={20} /> }
    ]
  }
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { auth } = useAuth();
  const { user } = auth;
  const location = useLocation();

  const roleRoutes = {
    1: ["/dashboard", "/class", "/staff", "/students", "/subjects", "/exams", "/question/create", "/results", "/upload-thoery-score", "/student-clearance", "/edit-academic-session", "/send-feedback", "/passage", "/student-promotion", "/backup-settings", "/migrate-students"],
    2: ["/dashboard", "/staff", "/students", "/staff/subjects", "/exams", "/question/create", "/staff/exams", "/results", "/send-feedback"],
    4: ["/schools", "/admin-users", "/backup-settings"]
  };

  const routeNames = {
    1: ["Class", "Staff", "Student", "Subject", "Questions", "Examination", "Result", "Setting", "Feedback","System"],
    2: ["Subject", "Questions", "Examination", "Result", "Feedback"],
    4: ["Administration", "System"]
  };

  const allowedRoutes = roleRoutes[user?.role] || [];
  const allowedNames = routeNames[user?.role] || [];

  return (

    <aside className={`w-64 bg-white h-[92.5vh] fixed md:static transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg border-r border-gray-200 ${
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    } flex flex-col`}>
        
      
      <div className="p-4 overflow-y-auto h-full pb-2">

        <ul className="mt-4 space-y-2">
          {navLinksItem
            .filter(({ name }) => allowedNames.includes(name))
            .map(({ name, subLinks }, index) => (
              <li key={index}>
                <h5 className="text-sm font-semibold text-blue-600 uppercase tracking-wide px-3 py-2">
                  {name}
                </h5>
                <ul className="ml-4 space-y-1">
                  {subLinks
                    .filter((subLink) => allowedRoutes.includes(subLink.link))
                    .map((subLink, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={subLink.link}
                          onClick={() => {
                            if (window.innerWidth < 768) setIsOpen(false);
                          }}
                          className={({ isActive }) =>
                            `flex items-center px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors duration-200 ${
                              location.pathname.startsWith(subLink.link)
                                ? 'bg-blue-100 text-blue-700'
                                : ''
                            }`
                          }
                        >
                          <span className="mr-3">{subLink.icon}</span>
                          <span>{subLink.name}</span>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-gray-200 text-center">
        <small className="text-gray-500 font-bold">Version 2.2</small>
      </div>
    </aside>
  );
}


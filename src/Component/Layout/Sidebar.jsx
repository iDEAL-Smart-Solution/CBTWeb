import React from 'react';
import { useAuth } from "../../Zustand/auth";
import { NavLink, useLocation } from "react-router-dom";
import {
  Book, UserPlus, Users, Clipboard, Plus,
  FileUp, List, BarChart2, Settings, MessageSquare, School
} from 'lucide-react';

const navLinksItem = [
  {
    name: "Class",
    subLinks: [
      { link: "/class", name: "List / Create", icon: <Clipboard size={20} /> }
    ]
  },
  {
    name: "Staff",
    subLinks: [
      { link: "/staff/registration", name: "Register", icon: <UserPlus size={20} /> },
      { link: "/staff/list", name: "List", icon: <Users size={20} /> }
    ]
  },
  {
    name: "Student",
    subLinks: [
      { link: "/student/registration", name: "Register", icon: <UserPlus size={20} /> },
      { link: "/student/list", name: "List", icon: <Users size={20} /> }
    ]
  },
  {
    name: "Subject",
    subLinks: [
      { link: "/subject/create", name: "Create", icon: <Plus size={20} /> },
      { link: "/subject/list", name: "List", icon: <Clipboard size={20} /> },
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
      { link: "/exam/create", name: "Create", icon: <Plus size={20} /> },
      { link: "/exam/list", name: "List", icon: <Clipboard size={20} /> },
      { link: "/staff/exams", name: "My Exams", icon: <List size={20} /> },
      { link: "/student-clearance", name: "Exam Clearance", icon: <Settings size={20} /> },
    ]
  },
  {
    name: "Result",
    subLinks: [
      { link: "/subject-result", name: "By Subject", icon: <Book size={20} /> },
      { link: "/student-result", name: "By Student", icon: <BarChart2 size={20} /> },
      { link: "/upload-thoery-score", name: "Upload Score", icon: <FileUp size={20} /> }
    ]
  },
  {
    name: "Setting",
    subLinks: [
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
      { link: "/create-school", name: "Create School", icon: <Plus size={20} /> },
      { link: "/school-list", name: "List Schools", icon: <School size={20} /> },
      { link: "/admin/create", name: "Create Admin", icon: <UserPlus size={20} /> },
      { link: "/admin/users", name: "Admin Users", icon: <Users size={20} /> }
    ]
  }
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { auth } = useAuth();
  const { user } = auth;
  const location = useLocation();

  const roleRoutes = {
    1: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list", "/question/create", "/subject-result", "/student-result", "/upload-thoery-score", "/student-clearance", "/edit-academic-session", "/send-feedback", "/passage",],
    2: ["/dashboard", "/staff/list", "/student/registration", "/student/list", "/staff/subjects", "/exam/create", "/question/create", "/staff/exams", "/subject-result", "/send-feedback"],
    4: ["/create-school", "/school-list", "/admin/create", "/admin/users"]
  };

  const routeNames = {
    1: ["Class", "Staff", "Student", "Subject", "Questions", "Examination", "Result", "Setting", "Feedback"],
    2: ["Subject", "Questions", "Examination", "Result", "Feedback"],
    4: ["Administration"]
  };

  const allowedRoutes = roleRoutes[user?.role] || [];
  const allowedNames = routeNames[user?.role] || [];

  return (

    <aside className={`w-64 bg-white shadow-lg h-[92.5vh] fixed md:static transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out z-50 ${
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
        <small className="text-gray-500 font-bold">Version 1.5</small>
      </div>
    </aside>
  );
}


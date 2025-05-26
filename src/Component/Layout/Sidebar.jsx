import React, { useState } from 'react';
import { useAuth } from "../../Zustand/auth";
import { NavLink } from "react-router-dom";
import { FaPlus, FaUserPlus, FaUsers, FaBookOpen, FaClipboardList, FaChartBar, FaCog, FaComment } from 'react-icons/fa';
import { MdFileUpload } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';

const navLinksItem = [
        {
            name: "Class",
            subLinks: [
                {
                    link: "/class",
                    name: "List / Create",
                    icon: <FaClipboardList />
                }
            ]
        },
        {
            name: "Staff",
            subLinks: [
                {
                    link: "/staff/registration",
                    name: "Register",
                    icon: <FaUserPlus />
                },
                {
                    link: "/staff/list",
                    name: "List",
                    icon: <FaUsers />
                }
            ]
        },
        {
            name: "Student",
            subLinks: [
                {
                    link: "/student/registration",
                    name: "Register",
                    icon: <FaUserPlus />
                },
                {
                    link: "/student/list",
                    name: "List",
                    icon: <FaUsers />
                }
            ]
        },
        {
            name: "Subject",
            subLinks: [
                {
                    link: "/subject/create",
                    name: "Create",
                    icon: <FaPlus />
                },
                {
                    link: "/subject/list",
                    name: "List",
                    icon: <FaClipboardList />
                },
                {
                    link: "/staff/subjects",
                    name: "My subjects",
                    icon: <AiOutlineUnorderedList />
                }
            ]
        },
        {
            name: "Questions",
            subLinks: [
                {
                    link: "/question/create",
                    name: "Create",
                    icon: <FaPlus />
                },
                { 
                    link: "/passage",
                    name: "Passage",
                    icon: <MdFileUpload />
                }
            ]
        },
        {
            name: "Examination",
            subLinks: [
                {
                    link: "/exam/create",
                    name: "Create",
                    icon: <FaPlus />
                },
                {
                    link: "/exam/list",
                    name: "List",
                    icon: <FaClipboardList />
                },
                {
                    link: "/staff/exams",
                    name: "My Exams",
                    icon: <AiOutlineUnorderedList />
                }
            ]
        },
        {
            name: "Result",
            subLinks: [
                {
                    link: "/subject-result",
                    name: "By Subject",
                    icon: <FaBookOpen />
                },
                {
                    link: "/student-result",
                    name: "By Student",
                    icon: <FaChartBar />
                },
                {
                    link: "/upload-thoery-score",
                    name: "Upload Score",
                    icon: <MdFileUpload />
                }
            ]
        },
        {
            name: "Setting",
            subLinks: [
                {
                    link: "/student-clearance",
                    name: "Exam Clearance",
                    icon: <FaCog />
                },
                {
                    link: "/edit-academic-session",
                    name: "Academic Session",
                    icon: <FaCog />
                },
                {
                    link: "/add-name-and-logo",
                    name: "Name and Logo",
                    icon: <FaCog />
                },
                {
                    link: "/next-term-or-session",
                    name: "Term and sesssion",
                    icon: <FaCog />
                },
            ]
        },
        {
            name: "Feedback",
            subLinks: [
                {
                    link: "/send-feedback",
                    name: "Send",
                    icon: <FaComment />
                }
            ]
        },
        {
            name: "Administration",
            subLinks: [
                {
                    link: "/create-school",
                    name: "Create",
                    icon: <FaPlus/>
                },
                {
                    link: "/school-list",
                    name: "List",
                    icon: <FaUsers />
                },
                {
                    link: "/admin/create",
                    name: "Create Admin",
                    icon: <FaPlus />
                },
                {
                    link: "/admin/users",
                    name: "Admin Users",
                    icon: <FaUsers />
                }
            ]
        }
        
    ]

export default function Sidebar() {
    const { auth } = useAuth();
    const { user } = auth;

    const roleRoutes = {
        1: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list", "/question/create", "/subject-result", "/student-result", "/upload-thoery-score", "/student-clearance", "/edit-academic-session", "/send-feedback", "/passage", "/add-name-and-logo", "/next-term-or-session"],
        2: ["/dashboard", "/staff/list", "/student/registration", "/student/list", "/staff/subjects", "/exam/create", "/question/create", "/staff/exams", "/subject-result", "/send-feedback", ],
        4: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list", "/question/create", "/subject-result", "/student-result", "/upload-thoery-score", "/student-clearance", "/edit-academic-session", "/send-feedback", "/passage", "/add-name-and-logo", "/next-term-or-session", "/create-school", "/school-list","/admin/create", "/admin/users"],
    };

    const routeNames = {
        1: ["Class", "Staff", "Student", "Subject", "Questions", "Examination", "Result", "Setting", "Feedback"],
        2: ["Subject", "Questions", "Examination", "Result", "Feedback"],
        4: ["Class", "Staff", "Student", "Subject", "Questions", "Examination", "Result", "Setting", "Feedback", "Administration"],
    };

    const allowedRoutes = roleRoutes[user?.role] || [];
    const allowedNames = routeNames[user?.role] || [];

    const [activeLink, setActiveLink] = useState("");

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div style={{ height: '100vh' }}>
            <ul>
                {navLinksItem
                    .filter(({ name }) => allowedNames.includes(name))
                    .map(({ name, subLinks }, index) => (
                        <li key={index} className="li">
                            <div className="color-primary">
                                <h5>{name.toUpperCase()}</h5>
                            </div>
                            {subLinks && (
                                <ul className="sub-links">
                                    {subLinks
                                        .filter((subLink) => allowedRoutes.includes(subLink.link))
                                        .map((subLink, subIndex) => (
                                            <li key={subIndex} className="li">
                                                <NavLink
                                                    className={`text-dec-none side-bar-dec ${activeLink === subLink.link ? "active-link" : "color-mute"}`}
                                                    to={subLink.link}
                                                    end
                                                    onClick={() => handleLinkClick(subLink.link)}
                                                >
                                                    <div className="sublink-content">
                                                        <span className="sublink-icon">{subLink.icon}</span>
                                                        <p className="sublink-name">{subLink.name}</p>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
            <br />
            <br />
            <div style={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                zIndex: '99',
                backgroundColor: '#eee',
                paddingLeft: '20px',
                paddingRight: '20px'
            }}>
                <small className='bolder color-mute'>version 1.5</small>
            </div>
        </div>
    );
}

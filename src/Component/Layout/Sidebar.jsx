// import { useState } from "react";
// import { useAuth } from "../../Zustand/auth";
// import { NavLink } from "react-router-dom";

// const navLinksItem = [
//     { link: "/dashboard", name: "DashBoard" },
//     { link: "/class", name: "Class" },
//     {
//         name: "Staff",
//         subLinks: [
//             { link: "/staff/registration", name: "Register" },
//             { link: "/staff/edit", name: "Edit" },
//             { link: "/staff/list", name: "List" },
//         ],
//     },
//     {
//         name: "Student",
//         subLinks: [
//             { link: "/student/registration", name: "register"},
//             { link: "/student/list", name: "list"},
//         ]
//     },
//     {
//         name: "Subject",
//         subLinks: [
//             { link: "/subject/create", name: "create"},
//             { link: "/subject/list", name: "list" },
//         ]
//     },
//     {
//         name: "Exam",
//         subLinks: [
//             { link: "/exam/create", name: "create"},
//             { link: "/exam/list", name: "list"}
//         ]
//     }
// ];

// export default function Sidebar() {
//     const { auth } = useAuth();
//     const { user } = auth;
//     const roleRoutes = {
//         4: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list"],
//         2: ["/dashboard", "/staff/list", "/student/registration", "/student/list", "/subject/list", "/exam/create", "/exam/list"],
//         1: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list"],
//     };
//     const allowedRoutes = roleRoutes[user?.role] || [];

//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     return (
//         <div className="">
//             <ul className="">
//                 {navLinksItem.map(({ link, name, subLinks }, index) =>
//                     link ? (
//                         allowedRoutes.includes(link) && (
//                             <li key={index} className="li">
//                                 <NavLink className="text-dec-none bold color-primary" to={link} end>
//                                     <div className="">
//                                         <span className="">{name}</span>
//                                     </div>
//                                 </NavLink>
//                             </li>
//                         )
//                     ) : (
//                         <li key={index} className="li">
//                             <div className="dropdown-toggle" onClick={toggleDropdown}>
//                                 <span className="bold color-primary">{name}</span>
//                             </div>
//                             {dropdownOpen && (
//                                 <ul className="dropdown-menu">
//                                     {subLinks.map((subLink, subIndex) =>
//                                         allowedRoutes.includes(subLink.link) ? (
//                                             <li key={subIndex} className="li">
//                                                 <NavLink className="text-dec-none color-primary" to={subLink.link} end>
//                                                     <div className="">
//                                                         <span className="">{subLink.name}</span>
//                                                     </div>
//                                                 </NavLink>
//                                             </li>
//                                         ) : null
//                                     )}
//                                 </ul>
//                             )}
//                         </li>
//                     )
//                 )}
//             </ul>
//         </div>
//     );
// }




// import { useAuth } from "../../Zustand/auth";
// import { NavLink } from "react-router-dom";

// const navLinksItem = [
//     // { link: "/dashboard", name: "DashBoard" },
//     // { link: "/class", name: "Class" },
//     {
//         name: "Class",
//         subLinks: [
//             { link: "/class", name: "List / Create" },
            
//         ],
//     },
//     {
//         name: "Staff",
//         subLinks: [
//             { link: "/staff/registration", name: "Register" },
//             { link: "/staff/list", name: "List" },
//         ],
//     },
//     {
//         name: "Student",
//         subLinks: [
//             { link: "/student/registration", name: "Register" },
//             { link: "/student/list", name: "List" },
//         ],
//     },
//     {
//         name: "Subject",
//         subLinks: [
//             { link: "/subject/create", name: "Create" },
//             { link: "/subject/list", name: "List" },
//         ],
//     },
//     {
//         name: "Questions",
//         subLinks: [
//             { link: "/question/create", name:"Create"}
//         ]
//     },
//     {
//         name: "Examination",
//         subLinks: [
//             { link: "/exam/create", name: "Create" },
//             { link: "/exam/list", name: "List" },
//         ],
//     },
//     {
//         name: "Result",
//         subLinks:[
//             { link: "/subject-result", name: "By Subject"},
//             { link: "/student-result", name: "By Student"},
//         ]
//     }
// ];

// export default function Sidebar() {
//     const { auth } = useAuth();
//     const { user } = auth;
//     const roleRoutes = {
//         4: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list"],
//         2: ["/dashboard", "/staff/list", "/student/registration", "/student/list", "/subject/list", "/exam/create", "/exam/list"],
//         1: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list", "/question/create", "/subject-result", "/student-result"],
//     };
//     const allowedRoutes = roleRoutes[user?.role] || [];

//     return (
//         <div>
//             <ul>
//                 {navLinksItem.map(({ name, subLinks }, index) => (
//                     <li key={index} className="li">
//                             <div className="color-dark">
//                             <h4>{name.toLocaleUpperCase()}</h4>
//                             </div>
//                         {subLinks && (
//                             <ul className="sub-links">
//                                 {subLinks.map((subLink, subIndex) =>
//                                     allowedRoutes.includes(subLink.link) ? (
//                                         <li key={subIndex} className="li">
//                                             <NavLink className="text-dec-none color-primary" to={subLink.link} end>
//                                                     <h5>{subLink.name}</h5>
//                                             </NavLink>
//                                         </li>
//                                     ) : null
//                                 )}
//                             </ul>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }




import React from 'react';
import { useAuth } from "../../Zustand/auth";
import { NavLink } from "react-router-dom";
import { FaPlus, FaUserPlus, FaUsers, FaBookOpen, FaQuestion, FaClipboardList, FaChartBar } from 'react-icons/fa';

const navLinksItem = [
    {
        name: "Class",
        subLinks: [
            { link: "/class", name: "List / Create", icon: <FaClipboardList /> },
        ],
    },
    {
        name: "Staff",
        subLinks: [
            { link: "/staff/registration", name: "Register", icon: <FaUserPlus /> },
            { link: "/staff/list", name: "List", icon: <FaUsers /> },
        ],
    },
    {
        name: "Student",
        subLinks: [
            { link: "/student/registration", name: "Register", icon: <FaUserPlus /> },
            { link: "/student/list", name: "List", icon: <FaUsers /> },
        ],
    },
    {
        name: "Subject",
        subLinks: [
            { link: "/subject/create", name: "Create", icon: <FaPlus /> },
            { link: "/subject/list", name: "List", icon: <FaClipboardList /> },
        ],
    },
    {
        name: "Questions",
        subLinks: [
            { link: "/question/create", name: "Create", icon: <FaPlus /> }
        ]
    },
    {
        name: "Examination",
        subLinks: [
            { link: "/exam/create", name: "Create", icon: <FaPlus /> },
            { link: "/exam/list", name: "List", icon: <FaClipboardList /> },
        ],
    },
    {
        name: "Result",
        subLinks:[
            { link: "/subject-result", name: "By Subject", icon: <FaBookOpen /> },
            { link: "/student-result", name: "By Student", icon: <FaChartBar /> },
        ]
    }
];

export default function Sidebar() {
    const { auth } = useAuth();
    const { user } = auth;
    const roleRoutes = {
        4: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list"],
        2: ["/dashboard", "/staff/list", "/student/registration", "/student/list", "/subject/list", "/exam/create", "/exam/list"],
        1: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list", "/question/create", "/subject-result", "/student-result"],
    };
    const allowedRoutes = roleRoutes[user?.role] || [];

    return (
        <div>
            <ul>
                {navLinksItem.map(({ name, subLinks }, index) => (
                    <li key={index} className="li">
                        <div className="color-dark">
                            <h5>{name.toUpperCase()}</h5>
                        </div>
                        {subLinks && (
                            <ul className="sub-links">
                                {subLinks.map((subLink, subIndex) =>
                                    allowedRoutes.includes(subLink.link) ? (
                                        <li key={subIndex} className="li">
                                            <NavLink className="text-dec-none color-mute" to={subLink.link} end>
                                                <div className="sublink-content">
                                                    <span className="sublink-icon">{subLink.icon}</span>
                                                    <p className='sublink-name'>{subLink.name}</p>
                                                </div>
                                            </NavLink>
                                        </li>
                                    ) : null
                                )}
                                
                            </ul>
                        )}
                    </li>
                ))}
                
            </ul>
        </div>
    );
}
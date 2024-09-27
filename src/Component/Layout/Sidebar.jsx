// import React from 'react';
// import { useAuth } from "../../Zustand/auth";
// import { NavLink } from "react-router-dom";
// import { FaPlus, FaUserPlus, FaUsers, FaBookOpen, FaClipboardList, FaChartBar, FaCog } from 'react-icons/fa';

// const navLinksItem = [
//     {
//         name: "Class",
//         subLinks: [
//             { link: "/class", name: "List / Create", icon: <FaClipboardList /> },
//         ],
//     },
//     {
//         name: "Staff",
//         subLinks: [
//             { link: "/staff/registration", name: "Register", icon: <FaUserPlus /> },
//             { link: "/staff/list", name: "List", icon: <FaUsers /> },
//         ],
//     },
//     {
//         name: "Student",
//         subLinks: [
//             { link: "/student/registration", name: "Register", icon: <FaUserPlus /> },
//             { link: "/student/list", name: "List", icon: <FaUsers /> },
//         ],
//     },
//     {
//         name: "Subject",
//         subLinks: [
//             { link: "/subject/create", name: "Create", icon: <FaPlus /> },
//             { link: "/subject/list", name: "List", icon: <FaClipboardList /> },
//         ],
//     },
//     {
//         name: "Questions",
//         subLinks: [
//             { link: "/question/create", name: "Create", icon: <FaPlus /> }
//         ]
//     },
//     {
//         name: "Examination",
//         subLinks: [
//             { link: "/exam/create", name: "Create", icon: <FaPlus /> },
//             { link: "/exam/list", name: "List", icon: <FaClipboardList /> },
//         ],
//     },
//     {
//         name: "Result",
//         subLinks: [
//             { link: "/subject-result", name: "By Subject", icon: <FaBookOpen /> },
//             { link: "/student-result", name: "By Student", icon: <FaChartBar /> },
//         ]
//     },
//     {
//         name: "Setting",
//         subLinks: [
//             { link: "/student-clearance", name: "exam clearance", icon: <FaCog /> }
//         ]
//     }
// ];

// export default function Sidebar() {
//     const { auth } = useAuth();
//     const { user } = auth;
//     const roleRoutes = {
//         4: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list"],
//         2: ["/dashboard", "/staff/list", "/student/registration", "/student/list", "/subject/list", "subject/create", "/exam/create", "/exam/list"],
//         1: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list", "/question/create", "/subject-result", "/student-result", "/student-clearance"],
//     };
//     const routeNames = {
//         1: ["Class", "Staff", "Student", "Subject", "Questions", "Examination", "Result", "Setting"],
//         2: ["Subject", "Question", "Examination", "Result"],
//     }
//     const allowedRoutes = roleRoutes[user?.role] || [];
//     const allowedNames = routeNames[user?.role] || [];

//     return (
//         <div>
//             <ul>
//                 {navLinksItem.map(({ name, subLinks }, index) => (
//                     <li key={index} className="li">
//                         {allowedNames.includes(name) ? (<div className="color-primary">
//                             <h5>{name.toUpperCase()}</h5>
//                         </div>) : null

//                         }
//                         {subLinks && (
//                             <ul className="sub-links">
//                                 {subLinks.map((subLink, subIndex) =>
//                                     allowedRoutes.includes(subLink.link) ? (
//                                         <li key={subIndex} className="li">
//                                             <NavLink className="text-dec-none color-mute" to={subLink.link} end>
//                                                 <div className="sublink-content">
//                                                     <span className="sublink-icon">{subLink.icon}</span>
//                                                     <p className='sublink-name'>{subLink.name}</p>
//                                                 </div>
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
import { FaPlus, FaUserPlus, FaUsers, FaBookOpen, FaClipboardList, FaChartBar, FaCog } from 'react-icons/fa';

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
        subLinks: [
            { link: "/subject-result", name: "By Subject", icon: <FaBookOpen /> },
            { link: "/student-result", name: "By Student", icon: <FaChartBar /> },
        ]
    },
    {
        name: "Setting",
        subLinks: [
            { link: "/student-clearance", name: "Exam Clearance", icon: <FaCog /> },
            { link: "/edit-academic-session", name: "Academic Session", icon: <FaCog /> }

        ]
    }
];

export default function Sidebar() {
    const { auth } = useAuth();
    const { user } = auth;
    
    const roleRoutes = {
        4: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list"],
        2: ["/dashboard", "/staff/list", "/student/registration", "/student/list", "/subject/list", "/exam/create", "/question/create", "/exam/list"],
        1: ["/dashboard", "/class", "/staff/registration", "/staff/edit", "/staff/list", "/student/registration", "/student/list", "/subject/create", "/subject/list", "/exam/create", "/exam/list", "/question/create", "/subject-result", "/student-result", "/student-clearance", "/edit-academic-session"],
    };
    
    const routeNames = {
        1: ["Class", "Staff", "Student", "Subject", "Questions", "Examination", "Result", "Setting"],
        2: ["Subject", "Questions", "Examination"],
    };

    const allowedRoutes = roleRoutes[user?.role] || [];
    const allowedNames = routeNames[user?.role] || [];

    return (
        <div>
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
                                                <NavLink className="text-dec-none color-mute" to={subLink.link} end>
                                                    <div className="sublink-content">
                                                        <span className="sublink-icon">{subLink.icon}</span>
                                                        <p className='sublink-name'>{subLink.name}</p>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

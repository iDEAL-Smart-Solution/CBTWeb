import { useState } from "react";
import { useAuth } from "../../Zustand/auth";
import { NavLink } from "react-router-dom";

const navLinksItem = [
    { link: "/dashboard", name: "DashBoard" },
    { link: "/class", name: "Class" },
    {
        name: "Staff",
        subLinks: [
            { link: "/staff/create", name: "Register" },
            { link: "/staff/edit", name: "Edit" },
            { link: "/staff/list", name: "List" },
        ],
    },
];

export default function Sidebar() {
    const { auth } = useAuth();
    const { user } = auth;
    const roleRoutes = {
        4: ["/dashboard", "/class", "/staff/create", "/staff/edit", "/staff/list"],
        2: ["/dashboard", "/class", "/staff/create", "/staff/edit", "/staff/list"],
        1: ["/dashboard", "/class"],
    };
    const allowedRoutes = roleRoutes[user?.role] || [];

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="">
            <ul className="">
                {navLinksItem.map(({ link, name, subLinks }, index) =>
                    link ? (
                        allowedRoutes.includes(link) && (
                            <li key={index} className="li">
                                <NavLink className="text-dec-none bold color-primary" to={link} end>
                                    <div className="">
                                        <span className="">{name}</span>
                                    </div>
                                </NavLink>
                            </li>
                        )
                    ) : (
                        <li key={index} className="li">
                            <div className="dropdown-toggle" onClick={toggleDropdown}>
                                <span className="bold color-primary">{name}</span>
                            </div>
                            {dropdownOpen && (
                                <ul className="dropdown-menu">
                                    {subLinks.map((subLink, subIndex) =>
                                        allowedRoutes.includes(subLink.link) ? (
                                            <li key={subIndex} className="li">
                                                <NavLink className="text-dec-none color-primary" to={subLink.link} end>
                                                    <div className="">
                                                        <span className="">{subLink.name}</span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        ) : null
                                    )}
                                </ul>
                            )}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

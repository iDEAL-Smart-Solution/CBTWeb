import { useAuth } from "../../Zustand/auth";
import { NavLink } from "react-router-dom";

const navLinksItem = [
     { link: "/dashboard", name: "DashBoard" },
     { link: "/class", name: "Class" },
]

export default function Sidebar() {
     const { auth } = useAuth();
     const { user } = auth;
     const roleRoutes = {
          4: ["/dashboard", "/class"],
          2: ["/dashboard", "/class"],
          1: ["/dashboard", "/class"],
     }
     const allowedRoutes = roleRoutes[user?.role] || [];

     return (
          <div className="">
               <ul className="">
                    {navLinksItem.map(({ link, name }, index) => 
                         allowedRoutes.includes(link) ? (
                              <li key={index} className="li">
                                   <NavLink className={`text-dec-none bold`} to={link} end>
                                        <div className="">
                                             <span className=''>{name}</span>
                                        </div>
                                   </NavLink>
                              </li>
                         ) : null
                    )}
               </ul>
          </div>
     )
}
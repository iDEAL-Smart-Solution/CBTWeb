import { useAuth } from "../../Zustand/auth";
import { Link } from "react-router-dom";

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
          <>
               <div className="">
                    <ul className="">
                         {navLinksItem.map(({ link, name }, index) => (
                              allowedRoutes.includes(link) && (
                                   <Link end key={index} className={`text-dec-none color-primary bold`} to={link}>
                                        <div className="">
                                             {/* <span className='text-prim'>{icon}</span> */}
                                             <span className=''>{name}</span>
                                        </div>
                                   </Link>
                              )
                         ))}
                    </ul>
               </div>
          </>
     )
}

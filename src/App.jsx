import './App.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Auth from './Pages/auth';
import Root from './Pages/Layout/root';
import Admin from './Pages/Admin';
import Staff from './Pages/Staff';
import Dev from './Pages/Dev';
import Class from './Pages/Class';
import SingleClass from './Pages/Class/singleClass';
import CreateStaff from './Pages/Staff/createStaff';
import StaffList from './Pages/Staff/StaffList';



function App() {

  const ComponentToRender = () => {
    let user = JSON.parse(sessionStorage.getItem("user"))
    if (!user) return <Auth />;
    const roleToComponent = {
      1: <Admin />,
      2: <Staff />,
      4: <Dev />,
    };
    return roleToComponent[user.role] || <Auth />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
      loader: () => {
        let user = JSON.parse(sessionStorage.getItem("user"))
        return user ? redirect("/dashboard") : null
      }
    },
    {
      element: <Root />,
      loader: () => {
        let user = JSON.parse(sessionStorage.getItem("user"))
        return !user ? redirect("/") : null
      },
      children: [
        { path: "/dashboard", element: <ComponentToRender /> },
        { path: "/class", element: <Class /> },
        { path: "/class/:id", element: <SingleClass /> },
        { path: "/staff/create", element: <CreateStaff /> },
        { path: "/staff/list", element: <StaffList /> },

      ],
    },
  ]);
  return (
    <>
      <div className=''>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App

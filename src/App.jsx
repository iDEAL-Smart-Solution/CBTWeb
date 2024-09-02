import './App.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Auth from './Pages/auth';
import Root from './Pages/Layout/root';
// import Admin from './Pages/Admin';
// import Staff from './Pages/Staff';
import Dev from './Pages/Dev';
import Class from './Pages/Class';
import SingleClass from './Pages/Class/singleClass';
import StaffRegistration from './Pages/Staff/staffRegistration';
import StaffList from './Pages/Staff/StaffList';
import StudentRegistration from './Pages/Student/studentRegistration';
import StudentList from './Pages/Student/studentList';
import SubjectCreation from './Pages/Subject/subjectCreation';
import SubjectList from './Pages/Subject/subjectList';
import ExamCreation from './Pages/Exam/examCreation';
import ExamList from './Pages/Exam/examList';
import SingleExam from './Pages/Exam/singleExam';



function App() {

  const ComponentToRender = () => {
    let user = JSON.parse(sessionStorage.getItem("user"))
    if (!user) return <Auth />;
    const roleToComponent = {
      1: <Class />,
      2: <SubjectCreation />,
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
        { path: "/staff/registration", element: <StaffRegistration /> },
        { path: "/staff/list", element: <StaffList /> },
        { path: "/student/registration", element: <StudentRegistration /> },
        { path: "/student/list", element: <StudentList /> },
        { path: "/subject/create", element: <SubjectCreation /> },
        { path: "/subject/list", element: <SubjectList /> },
        { path: "/exam/create", element: <ExamCreation /> },
        { path: "/exam/list", element: <ExamList /> },
        { path: "/exam/:id", element: <SingleExam /> },



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

// import './App.css';
// import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
// import Auth from './Pages/auth';
// import Root from './Pages/Layout/root';
// import StudentLayout from './Pages/Layout/studentLayout';
// import Dev from './Pages/Dev';
// import Class from './Pages/Class';
// import SingleClass from './Pages/Class/singleClass';
// import StaffRegistration from './Pages/Staff/staffRegistration';
// import StaffList from './Pages/Staff/StaffList';
// import StudentRegistration from './Pages/Student/studentRegistration';
// import StudentList from './Pages/Student/studentList';
// import SubjectCreation from './Pages/Subject/subjectCreation';
// import SubjectList from './Pages/Subject/subjectList';
// import ExamCreation from './Pages/Exam/examCreation';
// import ExamList from './Pages/Exam/examList';
// import SingleExam from './Pages/Exam/singleExam';
// import QuestionUpload from './Pages/Question/questionUpload';
// import MyExams from './Pages/Exam/myExams';
// import ExamInstruction from './Pages/Exam/examIntructions'

// function App() {
//   const getUser = () => JSON.parse(sessionStorage.getItem("user"));

//   const ComponentToRender = () => {
//     let user = getUser();
//     if (!user) return <Auth />;
//     const roleToComponent = {
//       1: <Class />,
//       2: <SubjectCreation />,
//       3: <MyExams />,
//       4: <Dev />,
//     };
//     return roleToComponent[user.role] || <Auth />;
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Auth />,
//       loader: () => {
//         let user = getUser();
//         return user ? redirect("/dashboard") : null;
//       }
//     },
//     {
//       loader: () => {
//         let user = getUser();
//         if (!user) return redirect("/");

//         // if (user.role === 3) {
//         //   return redirect("/student/exam/my-exams/");
//         // }
//         return null;
//       },
//       element: getUser()?.role === 3 ? <StudentLayout /> : <Root />,
//       children: [
//         { path: "/dashboard", element: <ComponentToRender /> },
//         { path: "/class", element: <Class /> },
//         { path: "/class/:id", element: <SingleClass /> },
//         { path: "/staff/registration", element: <StaffRegistration /> },
//         { path: "/staff/list", element: <StaffList /> },
//         { path: "/student/registration", element: <StudentRegistration /> },
//         { path: "/student/list", element: <StudentList /> },
//         { path: "/subject/create", element: <SubjectCreation /> },
//         { path: "/subject/list", element: <SubjectList /> },
//         { path: "/exam/create", element: <ExamCreation /> },
//         { path: "/exam/list", element: <ExamList /> },
//         { path: "/exam/:id", element: <SingleExam /> },
//         { path: "/question/create", element: <QuestionUpload /> },
//       ],
//     },
//     {
//       element: <StudentLayout />,
//       loader: () => {
//         let user = getUser();
//         return !user ? redirect("/") : null;
//       },
//       children: [
//         { path: "/student/exam/my-exams", element: <MyExams /> },
//         { path: "/student/exam/intsructions/:id", element: <ExamInstruction /> },
//       ]
//     }
//   ]);

//   return (
//     <>
//       <div>
//         <RouterProvider router={router} />
//       </div>
//     </>
//   );
// }

// export default App;






import './App.css';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Auth from './Pages/auth';
import Root from './Pages/Layout/root';
import StudentLayout from './Pages/Layout/studentLayout';
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
import QuestionUpload from './Pages/Question/questionUpload';
import MyExams from './Pages/Exam/myExams';
import ExamInstruction from './Pages/Exam/examInstructions';
import DoExam from './Pages/Exam/doExam';
import ExamCompleted from './Pages/Exam/completed';

function App() {
  const getUser = () => JSON.parse(sessionStorage.getItem("user"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
      loader: () => {
        const user = getUser();
        if (user) {
          switch (user.role) {
            case 1: return redirect("/class");
            case 2: return redirect("/subject/list");
            case 3: return redirect("/my-exams");
            case 4: return redirect("/dev");
            default: return null;
          }
        }
        return null;
      }
    },
    {
      path: "/",
      element: <Root />,
      loader: () => {
        const user = getUser();
        return !user || user.role === 3 ? redirect("/") : null;
      },
      children: [
        { path: "class", element: <Class /> },
        { path: "class/:id", element: <SingleClass /> },
        { path: "staff/registration", element: <StaffRegistration /> },
        { path: "staff/list", element: <StaffList /> },
        { path: "student/registration", element: <StudentRegistration /> },
        { path: "student/list", element: <StudentList /> },
        { path: "subject/create", element: <SubjectCreation /> },
        { path: "subject/list", element: <SubjectList /> },
        { path: "exam/create", element: <ExamCreation /> },
        { path: "exam/list", element: <ExamList /> },
        { path: "exam/:id", element: <SingleExam /> },
        { path: "question/create", element: <QuestionUpload /> },
        { path: "dev", element: <Dev /> },
      ]
    },
    {
      element: <StudentLayout />,
      loader: () => {
        const user = getUser();
        return !user || user.role !== 3 ? redirect("/") : null;
      },
      children: [
        { path: "/my-exams", element: <MyExams /> },
        { path: "/instructions/:id", element: <ExamInstruction /> },
        { path: "/do-exam/:examKey", element: <DoExam /> },
        { path: "/exam-submited", element: <ExamCompleted /> },
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
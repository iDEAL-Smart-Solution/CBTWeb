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
import SingleSubject from './Pages/Subject/singleSubject';
import SubjectResult from './Pages/Result/subjectResult';
import StudentResult from './Pages/Result/studentResult';
import StudentClearancePage from './Pages/Student/studentClearance';
import ErrorPage from '../errorPage';
import Edit_Acad_Session from './Pages/Acad/edit_acad_session';
import StaffSubjects from './Pages/Subject/staffSubjects';
import StaffExams from './Pages/Exam/staffExams';
import UploadTheoryScore from './Pages/Result/uploadTheoryScore';
import FeedbackForm from './Pages/Feedback/feedbackform';
import Passage from './Pages/Passage/passage';
import SchoolRegistration from './Pages/School/School-Registraton';
import SchoolList from './Pages/School/School-list';
import AdminUserCreation from './Pages/Admin/admin-user-creation';
import AdminUserList from './Pages/Admin/admin-user-list';
import SchoolProfileScreen from './Pages/School/school-profile';
import StudentPromotion from './Pages/Student/studentPromotion';

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
            case 2: return redirect("/staff/subjects");
            case 3: return redirect("/my-exams");
            case 4: return redirect("/school-list");
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
        { path: "/subject/:id", element: <SingleSubject /> },
        { path: "/subject-result", element: <SubjectResult /> },
        { path: "/student-result", element: <StudentResult /> },
        { path: "/student-clearance", element: <StudentClearancePage /> },
        { path: "/student-promotion", element: <StudentPromotion /> },
        { path: "/edit-academic-session", element: <Edit_Acad_Session/> },
        { path: "/staff/subjects", element: <StaffSubjects /> },
        { path: "/staff/exams", element: <StaffExams /> },
        { path: "/upload-thoery-score", element: <UploadTheoryScore /> },
        { path: "/send-feedback", element: <FeedbackForm /> },
        { path: "*", element: <ErrorPage /> },
        { path: "/passage", element: <Passage /> },
        { path: "/create-school", element: <SchoolRegistration />},
        { path: "/school-list", element: <SchoolList /> },
        { path: "/admin/create", element: <AdminUserCreation /> },
        { path: "/admin/users", element: <AdminUserList /> },
        { path: "/school/:id", element: <SchoolProfileScreen /> },
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
        { path: "*", element: <ErrorPage /> }
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
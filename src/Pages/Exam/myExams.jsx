
import MyExamsTemplate from "../../Component/Exam/myExamsTemplate";
import { useAuth } from '../../Zustand/auth';
import { useExam } from "../../Zustand/examSlice";
import { useEffect } from "react";
import { useDoExam } from "../../Zustand/doExamSlice";

export default function MyExams() {
     const { auth } = useAuth();
     const { message } = useDoExam();
     const { exam, fetchMyExams } = useExam();
     const { user, academicSession } = auth;
     const id  = user?.id;
     const { current_Session, current_Term } = academicSession;

     const termMap = {
          1: "First Term",
          2: "Second Term",
          3: "Third Term",
      };

     useEffect(() => {
          fetchMyExams(id);
     }, [])

     const { exams, loading } = exam || {};

     return (
         <div>
          <p className="text-center text-big-2">{termMap[current_Term]} Examination {current_Session} Academic Session</p>
          <p className="text-big-1">Click your subject to start exam</p>
          {message && <p className="bg-color-danger color-light bold">{message}</p>}
           <div className="page-center-3">
               <div className="my-exams-box box-shadow">
                    {
                         loading ? (
                              <div className="loader-cell">
                                   <div className="loader"></div>
                              </div>
                         ) : !exams || exams.length == 0 ? (<p>You have no exam availability for you to do</p>) :
                              (exams.map((exam, index) => (
                                   <MyExamsTemplate name={exam.examName} id={exam.examId} key={exam.examId} index={index} />
                              )))
                    }
               </div>
          </div>
         </div>
     )
}
import ExamInstructionTemplate from "../../Component/Exam/examInstructionTemplate"
import { useExam } from "../../Zustand/examSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../Zustand/auth";


export default function ExamInstruction() {
     const { exam, fetchExamInstruction } = useExam();
     const { auth } = useAuth();
     const { user } = auth;
     const { instruction } = exam;
     const { id } = useParams();
     const examKey = id;
     useEffect(() => {
          fetchExamInstruction(examKey, user.id);
     }, [])
     return (
          <div className="page-center-2">
               <div className="register-box-2 box-shadow-2 text-left">
                    <b>
                         <ExamInstructionTemplate data={instruction} />
                    </b>
               </div>
          </div>
     )
}
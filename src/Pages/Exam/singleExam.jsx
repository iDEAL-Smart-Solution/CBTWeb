import SingleExamTemplate from "../../Component/Exam/singleExamTemplate"
import { useParams } from 'react-router-dom';
import { useExam } from "../../Zustand/examSlice";
import { useEffect } from "react";
import QuestionCard from "../../Component/Question/questionCardTemplate";
import { useQuestion } from "../../Zustand/questionSlice";
import { useNotification } from "../../Context/notificationContext";


export default function SingleExam() {
     const { id } = useParams();
     const { exam, fetchSingleExam } = useExam();
     const { editQuestion, deleteQuestion, question } = useQuestion();
     const { loading, errorMessage, singleExam } = exam;

     const { showSuccess, showError } = useNotification();


     useEffect(() => {
          fetchSingleExam(id);
     }, [])
     const handleDelele = async (iden) => {
          console.log(iden);
          try {
               let res = await deleteQuestion(iden);
               if (res) {
                    fetchSingleExam(id);
               }
          } catch (error) {
               
          }
     }
     const handleEdit = async (formData) => {
          console.log(formData);
          try {
               let res = await editQuestion(formData);
               if (res.success) {
                    fetchSingleExam(id);
                    showSuccess(res.message);
               } else {
                    showError(res.message)
               }
          } catch (error) {
               console.log(error);
          }
     }
     return (
          <div>
               <SingleExamTemplate data={singleExam} loading={loading} errorMessage={errorMessage} />
               <p className="bold text-big-2">Questions</p>
               <div className="card-container">
                    {loading ?
                         <div className="loader-cell">
                              <div className="loader"></div>
                         </div>
                         :
                         singleExam && singleExam.questions && singleExam.questions.length > 0
                              ? singleExam.questions.map((question, index) => ((
                                   <QuestionCard data={question} loading={loading} index={index} key={index} handleDelele={handleDelele} handleEdit={handleEdit} />
                              )))
                              : <p className="text-center text-big-2 bold">Questions not Found</p>
                    }
               </div>
          </div>
     )
}
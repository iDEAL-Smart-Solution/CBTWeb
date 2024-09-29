import SingleExamTemplate from "../../Component/Exam/singleExamTemplate"
import { useParams } from 'react-router-dom';
import { useExam } from "../../Zustand/examSlice";
import { useEffect } from "react";
import QuestionCard from "../../Component/Question/questionCardTemplate";
import { useQuestion } from "../../Zustand/questionSlice";
import { useNotification } from "../../Context/notificationContext";
import { useNavigate } from "react-router-dom";


export default function SingleExam() {
     const { id } = useParams();
     const navigate = useNavigate();
     const { exam, fetchSingleExam, deleteExam, editExam } = useExam();
     const { editQuestion, deleteQuestion } = useQuestion();
     const { loading, errorMessage, singleExam } = exam;

     const { showSuccess, showError } = useNotification();


     useEffect(() => {
          fetchSingleExam(id);
     }, [])
     const handleQuestionDelele = async (iden) => {
          console.log(iden);
          try {
               let res = await deleteQuestion(iden);
               if (res) {
                    fetchSingleExam(id);
               }
          } catch (error) {
               
          }
     }
     const handleQuestionEdit = async (formData) => {
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
     const handleExamEdit = async (formData) => {
          try {
               let res = await editExam(formData);
               if (res.success) {
                    fetchSingleExam(id);
                    showSuccess(res.message);
               } else {
                    showError(res.message)
               }
          } catch (error) {
               console.log(error);
               showError(error);
          }
     }
     const handleExamDelete = async (id) => {
          try {
               let res = await deleteExam(id);
               if(res.success) {
                    showSuccess(res.message);
                    navigate('/exam/list');
               } else {
                    showError("request failed");
               }
          } catch (error) {
               showError(error);
          }
     }
     return (
          <div>
               <SingleExamTemplate data={singleExam} loading={loading} errorMessage={errorMessage} handleDelele={handleExamDelete} handleEdit={handleExamEdit} />
               <p className="bold text-big-2">Questions</p>
               <div className="card-container">
                    {loading ?
                         <div className="loader-cell">
                              <div className="loader"></div>
                         </div>
                         :
                         singleExam && singleExam.questions && singleExam.questions.length > 0
                              ? singleExam.questions.map((question, index) => ((
                                   <QuestionCard data={question} loading={loading} index={index} key={index} handleDelele={handleQuestionDelele} handleEdit={handleQuestionEdit} />
                              )))
                              : <p className="text-center text-big-2 bold">Questions not Found</p>
                    }
               </div>
          </div>
     )
}
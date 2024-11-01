// import SingleExamTemplate from "../../Component/Exam/singleExamTemplate"
// import { useParams } from 'react-router-dom';
// import { useExam } from "../../Zustand/examSlice";
// import { useEffect } from "react";
// import QuestionCard from "../../Component/Question/questionCardTemplate";
// import { useQuestion } from "../../Zustand/questionSlice";
// import { useNotification } from "../../Context/notificationContext";
// import { useNavigate } from "react-router-dom";


// export default function SingleExam() {
//      const { id } = useParams();
//      const navigate = useNavigate();
//      const { exam, fetchSingleExam, deleteExam, editExam } = useExam();
//      const { editQuestion, deleteQuestion, uploadImageForQuestion } = useQuestion();
//      const { loading, errorMessage, singleExam } = exam;

//      console.log(singleExam);

//      const { showSuccess, showError } = useNotification();


//      useEffect(() => {
//           fetchSingleExam(id);
//      }, [])
//      const handleQuestionDelele = async (iden) => {
//           console.log(iden);
//           try {
//                let res = await deleteQuestion(iden);
//                if (res) {
//                     fetchSingleExam(id);
//                }
//           } catch (error) {

//           }
//      }
//      const handleQuestionEdit = async (formData) => {
//           try {
//                let res = await editQuestion(formData);
//                if (res.success) {
//                     fetchSingleExam(id);
//                     showSuccess(res.message);
//                } else {
//                     showError(res.message)
//                }
//           } catch (error) {
//                console.log(error);
//           }
//      }
//      const handleExamEdit = async (formData) => {
//           try {
//                let res = await editExam(formData);
//                if (res.success) {
//                     fetchSingleExam(id);
//                     showSuccess(res.message);
//                } else {
//                     showError(res.message)
//                }
//           } catch (error) {
//                console.log(error);
//                showError(error);
//           }
//      }
//      const handleExamDelete = async (id) => {
//           try {
//                let res = await deleteExam(id);
//                if(res.success) {
//                     showSuccess(res.message);
//                     navigate('/exam/list');
//                } else {
//                     showError("request failed");
//                }
//           } catch (error) {
//                showError(error);
//           }
//      }
//     const handleUploadImageForQuestion = async (formData) => {
//           try {
//                let res = await uploadImageForQuestion(formData);
//                if(res.success)
//                {
//                     showSuccess(res.message);
//                } else {
//                     showError(res.message);
//                }
//           } catch (error) {
//                showError(error);
//           }
//     }
//      return (
//           <div style={{overflowX: 'hidden'}}>
//                <SingleExamTemplate data={singleExam} loading={loading} errorMessage={errorMessage} handleDelele={handleExamDelete} handleEdit={handleExamEdit} />
//                <p className="bold text-big-2">Questions</p>
//                <div className="card-container">
//                     {loading ?
//                          <div className="loader-cell">
//                               <div className="loader"></div>
//                          </div>
//                          :
//                          singleExam && singleExam.objQuestions && singleExam.objQuestions.length > 0
//                               ? singleExam.objQuestions.map((question, index) => ((
//                                    <QuestionCard data={question} loading={loading} index={index} key={index} handleDelele={handleQuestionDelele} handleEdit={handleQuestionEdit} handleUpload={handleUploadImageForQuestion} />
//                               )))
//                               : <p className="text-center text-big-2 bold">Questions not Found</p>
//                     }
//                </div>
//           </div>
//      )
// }













import SingleExamTemplate from "../../Component/Exam/singleExamTemplate";
import { useParams } from 'react-router-dom';
import { useExam } from "../../Zustand/examSlice";
import { useEffect, useState } from "react";
import QuestionCard from "../../Component/Question/questionCardTemplate";
import { useQuestion } from "../../Zustand/questionSlice";
import { useNotification } from "../../Context/notificationContext";
import { useNavigate } from "react-router-dom";

export default function SingleExam() {
     const { id } = useParams();
     const navigate = useNavigate();
     const { exam, fetchSingleExam, deleteExam, editExam } = useExam();
     const { editQuestion, deleteQuestion, uploadImageForQuestion } = useQuestion();
     const { loading, errorMessage, singleExam } = exam;

     const { showSuccess, showError } = useNotification();

     // State to control toggle between objective and theory questions
     const [showObjQuestions, setShowObjQuestions] = useState(true);

     useEffect(() => {
          fetchSingleExam(id);
     }, [id, fetchSingleExam]);

     const handleQuestionDelele = async (iden) => {
          try {
               let res = await deleteQuestion(iden);
               if (res) {
                    fetchSingleExam(id);
               }
          } catch (error) {
               showError(error);
          }
     };

     const handleQuestionEdit = async (formData) => {
          try {
               let res = await editQuestion(formData);
               if (res.success) {
                    fetchSingleExam(id);
                    showSuccess(res.message);
               } else {
                    showError(res.message);
               }
          } catch (error) {
               showError(error);
          }
     };

     const handleExamEdit = async (formData) => {
          try {
               let res = await editExam(formData);
               if (res.success) {
                    fetchSingleExam(id);
                    showSuccess(res.message);
               } else {
                    showError(res.message);
               }
          } catch (error) {
               showError(error);
          }
     };

     const handleExamDelete = async (id) => {
          try {
               let res = await deleteExam(id);
               if (res.success) {
                    showSuccess(res.message);
                    navigate('/exam/list');
               } else {
                    showError("request failed");
               }
          } catch (error) {
               showError(error);
          }
     };

     const handleUploadImageForQuestion = async (formData) => {
          try {
               let res = await uploadImageForQuestion(formData);
               if (res.success) {
                    showSuccess(res.message);
               } else {
                    showError(res.message);
               }
          } catch (error) {
               showError(error);
          }
     };

     return (
          <div style={{ overflowX: 'hidden' }}>
               <SingleExamTemplate
                    data={singleExam}
                    loading={loading}
                    errorMessage={errorMessage}
                    handleDelele={handleExamDelete}
                    handleEdit={handleExamEdit}
               />

               <p className="bold text-big-2">Questions</p>

               <div className="toggle-buttons">
                    <button
                         className={`toggle-btn ${showObjQuestions ? 'active' : ''} bold`}
                         onClick={() => setShowObjQuestions(true)}
                         style={{
                              all: 'unset',
                              border: '1px solid var(--primary-color)',
                              backgroundColor: 'var(--primary-color)',
                              padding: '20px',
                              paddingTop: '10px',
                              paddingBottom: '10px',
                              color: 'var(--secondary-color)',
                              borderRadius: '10px',
                              marginLeft: '10px',
                              marginRight: '10px',
                         }}
                    >
                         Objective Questions
                    </button>
                    <button
                         className={`toggle-btn ${!showObjQuestions ? 'active' : ''}`}
                         onClick={() => setShowObjQuestions(false)}
                         style={{
                              all: 'unset',
                              border: '1px solid var(--primary-color)',
                              backgroundColor: 'var(--primary-color)',
                              padding: '20px',
                              paddingTop: '10px',
                              paddingBottom: '10px',
                              color: 'var(--secondary-color)',
                              borderRadius: '10px',
                              marginLeft: '10px',
                              marginRight: '10px',
                         }}
                    >
                         Theory Questions
                    </button>
               </div>

               <div className="card-container">
                    {loading ? (
                         <div className="loader-cell">
                              <div className="loader"></div>
                         </div>
                    ) : showObjQuestions ? (
                         singleExam?.objQuestions && singleExam.objQuestions.length > 0 ? (
                              <>
                                   {singleExam.objQuestions.map((question, index) => (
                                        <QuestionCard
                                             data={question}
                                             loading={loading}
                                             index={index}
                                             key={`obj-${index}`}
                                             handleDelele={handleQuestionDelele}
                                             handleEdit={handleQuestionEdit}
                                             handleUpload={handleUploadImageForQuestion}
                                        />
                                   ))}
                              </>
                         ) : (
                              <p className="text-center text-big-2 bold">Objective Questions not Found</p>
                         )
                    ) : singleExam?.theoryQuestions && singleExam.theoryQuestions.length > 0 ? (
                         <>
                              {singleExam.theoryQuestions.map((question, index) => (
                                   <QuestionCard
                                        data={question}
                                        loading={loading}
                                        index={index}
                                        key={`theory-${index}`}
                                        handleDelele={handleQuestionDelele}
                                        handleEdit={handleQuestionEdit}
                                        handleUpload={handleUploadImageForQuestion}
                                   />
                              ))}
                         </>
                    ) : (
                         <p className="text-center text-big-2 bold">Theory Questions not Found</p>
                    )}
               </div>

          </div>
     );
}

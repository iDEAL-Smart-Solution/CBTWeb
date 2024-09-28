import { useSubject } from "../../Zustand/subjectSlice";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleSubjectTemplate from "../../Component/Subject/singleSubjectTemplate";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Context/notificationContext";

export default function SingleSubject() {
     const { id } = useParams();
     const navigate = useNavigate();
     const { subject, fetchSingleSubject, deleteSubject,editSubject } = useSubject();
     const { errorMessage, singleSubject, loading, message } = subject;

    const { showSuccess, showError } = useNotification();


     useEffect(() => {
         fetchSingleSubject(id);
     }, [id, fetchSingleSubject]);
     const columns = [
          { key: 'examName', header: 'Name' },
          { key: 'duration', header: 'Duration' },
          { key: 'numberOfQuestionsPerStudent', header: 'No. Of Que Per Stu' },
          { key: 'obtainableScore', header: 'Obtainable Score' },
          { key: 'available', header: 'Available'},
          { key: 'totalQuestion', header: 'Total question'}
        ];

        const handleDelele = async (iden) => {
            console.log(iden);
            try {
                var res = await deleteSubject(id);
                if(res)
                {
                    deleteSubject(iden);
                    navigate('/subject/list');
                } else {

                }
            } catch (error) {

            }
       }
       const handleEdit =  async (formData) => {
            try {
                let res = await editSubject(formData);
                if(res.success)
                {
                    fetchSingleSubject(id);
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
             <SingleSubjectTemplate loading={loading} singleSubject={singleSubject} message={message}  errorMessage={errorMessage} handleDelele={handleDelele} handleEdit={handleEdit} />
             <div>
               <p className="bold text-big-2 ">Examinations</p>
             </div>
             {
                 singleSubject && singleSubject.exams && singleSubject.exams.length > 0
                     ? <ExamListTemplate1 data={singleSubject.exams} loading={loading} columns={columns} />
                     : <p className="text-center">Exam not found!!!</p>
             }
         </div>
     );
 }

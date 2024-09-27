import { useSubject } from "../../Zustand/subjectSlice";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleSubjectTemplate from "../../Component/Subject/singleSubjectTemplate";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";
import { useNavigate } from "react-router-dom";

export default function SingleSubject() {
     const { id } = useParams();
     const navigate = useNavigate();
     const { subject, fetchSingleSubject, deleteSubject,editSubject } = useSubject();
     const { errorMessage, singleSubject, loading } = subject;
 
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
                    navigate('/subject/list');
                } else {
                    
                }
            } catch (error) {
                
            }
            // deleteSubject(iden);
       }
       const handleEdit = (formData) => {
            console.log(formData);
            // editSubject(formData)
            // fetchSingleSubject(id);
       }
 
     return (
         <div>
             <SingleSubjectTemplate loading={loading} singleSubject={singleSubject} errorMessage={errorMessage} handleDelele={handleDelele} handleEdit={handleEdit} />
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
 
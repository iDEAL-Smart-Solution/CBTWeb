import SingleExamTemplate from "../../Component/Exam/singleExamTemplate"
import { useParams } from 'react-router-dom';
import { useExam } from "../../Zustand/examSlice";
import { useEffect } from "react";
import QuestionCard from "../../Component/Question/questionCardTemplate";


export default function SingleExam() {
     const { id } = useParams();
     const { exam, fetchSingleExam } = useExam();
     const { loading, errorMessage, singleExam } = exam;

     useEffect(() => {
          fetchSingleExam(id);
     }, [])
    
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
                                   <QuestionCard data={question} loading={loading} index={index} key={index} />
                              )))
                              : <p className="text-center text-big-2 bold">Questions not Found</p>
                    }
               </div>
          </div>
     )
}
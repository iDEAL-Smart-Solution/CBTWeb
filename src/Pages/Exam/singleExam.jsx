import SingleExamTemplate from "../../Component/Exam/singleExamTemplate"
import { useParams } from 'react-router-dom';


export default function SingleExam() {
     const { id } = useParams();

     return(
          <div>
               <SingleExamTemplate />
          </div>
     )
}
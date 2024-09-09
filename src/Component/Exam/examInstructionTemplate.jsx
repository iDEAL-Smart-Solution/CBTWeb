import { Link, useParams } from "react-router-dom"


export default function ExamInstructionTemplate({ data }) {
     const id = data.examKey;

     return (
          <div>
               <h1 className="color-primary">{data.introduction}</h1>
               <p>{data.exam_name_and_class}</p>
               <p>{data.instruction}</p>
               <p>{data.fareWell}</p>

               <Link to={`/do-exam/${data.examKey}`} className="link">
                    <button className="submit-button text-center color-light">
                         start
                    </button>
               </Link>
          </div>
     )
}
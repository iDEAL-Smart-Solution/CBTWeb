import { Link, useParams } from "react-router-dom"

export default function ExamInstructionTemplate({ data }) {
     const id = data.examKey;

     const termMap = {
          1: "1st Term",
          2: "2nd Term",
          3: "3rd Term",
     }

     const examTypeMap = {
          1: "First CA",
          2: "Second CA",
          3: "Third CA",
          4: "Exam",

     }

     return (
          <div>
               <h1 className="color-primary">Hello {data.studentName},</h1>
               <p>Subject: {data.subjectName}</p>
               <p>Type: {examTypeMap[data.examType]}</p>
               <p>Term: {termMap[data.term]}</p>
               <p>Session: {data.session}</p>
               <p>Duration:  {data.duration}</p>



               <Link to={`/do-exam/${data.examKey}`} className="link">
                    <button className="submit-button text-center color-light">
                         start
                    </button>
               </Link>
          </div>
     )
}
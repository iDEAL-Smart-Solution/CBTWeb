

export default function QuestionCard({ data, index, loading }) {
    
     return (
          <div className="card box-shadow-2">
               {loading ? (
                    <div className="loader-cell">
                         <div className="loader"></div>
                    </div>
               ) :
                    <div>
                         <p>{index + 1}. {data.question}</p>
                         <div className="p-l-20">
                              <p>A. {data.optionA}</p>
                              <p>B. {data.optionB}</p>
                              <p>C. {data.optionC}</p>
                              <p>D. {data.optionD}</p>
                         </div>
                         <p>Question Point: {data.pointPerQuestion}</p>
                         <p>Correct Answer: {data.answer}</p>
                    </div >}
          </div >
     )
}
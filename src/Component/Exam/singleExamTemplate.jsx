

export default function SingleExamTemplate({ loading, data, errorMessage }) {
     const termMap = {
          1: "1st_term",
          2: "2nd_term",
          3: "3rd_term",
        };
        
        const typeMap = {
          1: "1st_CA",
          2: "2nd_CA",
          3: "3rd_CA",
          4: "Exam"
        };

     return (
          <div>
               {
                    loading ? (
                         <div className="loader-cell">
                              <div className="loader"></div>
                         </div>
                    ) : !data ? (
                         <div className="text-center text-big-2">{errorMessage}</div>
                    ) : (
                         <div className="profile-group">
                              <div className="box-shadow-2 p-30 bold">
                                   <p>Subject Code : {data.subjectCode}</p>
                                   <p>Exam Name : {data.examName}</p>
                                   <p>Exam Term : {termMap[data.term]}</p>
                                   <p>Exam Session : {data.session}</p>
                                   <p>Start Time : {data.startTime}</p>
                              </div>
                              <div className="box-shadow-2 p-30 bold">
                                   <p>Duration of Exam : {data.duration}</p>
                                   <p>Exam Type : {typeMap[data.examType]}</p>
                                   <p>Available : {data.isAvailable}</p>
                                   <p>Number of question for each Studnet : {data.numberOfQuestionsPerStudent}</p>
                                   <p>Max Obtainable Score: {data.obtainableScore}</p>
                              </div>
                         </div>
                    )
               }
          </div>
     )
}
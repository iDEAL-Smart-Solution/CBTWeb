

export default function  SingleSubjectTemplate({ loading, singleSubject, errorMessage}) {
     return(
          <div>
               {
                    loading ? (
                         <div className="loader-cell">
                              <div className="loader"></div>
                         </div>
                    ) : !singleSubject ? (
                         <div className="text-center text-big-2">{errorMessage}</div>
                    ) : (
                         <div className="box-shadow-3 p-30 bold">
                              <p>Name : {singleSubject.name}</p>
                              <p>Code : {singleSubject.code}</p>
                              <p>Description : {singleSubject.description}</p>
                              <p>Class : {singleSubject.className}</p>
                              <p>Tutor : {singleSubject.staffName}</p>
                              <p>Allocated Exam Agregrate : {singleSubject.totalExamScore}</p>
                              <p>Allocated Test Agregrate : {singleSubject.totalTestScore}</p>
                         </div>
                    )
               }
          </div>
     )
}
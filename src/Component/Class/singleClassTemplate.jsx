import ListOFStudentForClass from "./listOfStudentForClass"
import ListOfSubjectForClass from "./listOfSubjecForClass"


export default function SingleClassTemplate({ students }) {
     return (
          <div className="box-shadow single-class-container">
               <p className="text-center color-primary single-class-name">
                    <b>
                         {students.name}
                    </b>
               </p>
               <div className="box-shadow single-class-box">
                    {
                         students.listOfStudents.map((stu, index) => (
                              <ListOFStudentForClass index={index} key={stu.id} id={stu.id} data={stu} />
                         ))
                    }
               </div>
               <div className="box-shadow single-class-box">
                    {
                         students.listOfSubjects.map((sub, index) => (
                              <ListOfSubjectForClass key={sub.id} id={sub.id} data={sub} index={index} />
                         ))
                    }
               </div>
               {/* <div className="box-shadow single-class-box">
                    {
                         students.listOfSubjects.map((sub, index) => (
                              <ListOfSubjectForClass key={sub.id} id={sub.id} data={sub} index={index} />
                         ))
                    }
               </div> */}
          </div>
     )
}
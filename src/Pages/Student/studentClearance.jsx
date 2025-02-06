import { useExam } from "../../Zustand/examSlice";
import { useStudent } from "../../Zustand/studentSlice";
import { useState } from "react";
import ClearanceTableTemplate from "../../Component/student/clearanceTableTemplate";
import { Submit } from "../../Component/ReUsableComponents/input";
import { Dropdown } from "../../Component/ReUsableComponents/dropDown";
import { useEffect } from "react";

export default function StudentClearancePage() {
     const { exam, fetchExamNamesAndId } = useExam();
     const { fetchStuddentForClearance, student, clearSingleStudents } = useStudent();
     const [showConfirmation, setShowConfirmation] = useState(false);


     const [examId, setExamId] = useState('');

     const handleInputChange = (e) => {
          setExamId(e.target.value);
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          console.log(examId)
          fetchStuddentForClearance(examId);
     };


     useEffect(() => {
          fetchExamNamesAndId(examId);
     }, []);

     const handleClearance = async (studentId, examId) => {
          console.log(studentId);
          console.log(examId);
          try {
               var res = await clearSingleStudents(studentId, examId);
               if (res) {
                    setShowConfirmation(true);
                    fetchStuddentForClearance(examId);
               }
          } catch (_error) {
               console.log(_error);
          }
     };

     const acknowledge = () => {
          setShowConfirmation(false);
     };

     const { studentsForClearnce, loading, message } = student;
     const { exams } = exam;
     return (
          <div>
               <div className="box-shadow header-crumbs">
                    <form onSubmit={handleSubmit} className="header-crumbs-2">
                         <div className="form-grouping">
                              <Dropdown
                                   name="examName"
                                   value={examId}
                                   handleChange={handleInputChange}
                                   width="80%"
                                   firstOption="Select exam name"
                                   options={exams}
                                   optionKey="id"
                                   optionValue="id"
                                   optionLabel="examName"
                                   mb="0"
                              />

                              <Submit className={`fetch-button text-center color-light`} loading={loading} isNotLoading={`fetch`} isloading={`fetching...`} />
                         </div>
                    </form>
               </div>

               <div>
                    {showConfirmation && (
                         <div className="modal-overlay">
                              <div className="confirmation-dialog  box-shadow-3">
                                   <p>{message}</p>
                                   <div className='form-grouping'>
                                        <button onClick={acknowledge} className="confirm-submit submit-button-2  text-center color-light bold">Ok</button>
                                   </div>
                              </div>
                         </div>

                    )}
                    <ClearanceTableTemplate data={studentsForClearnce} loading={loading} handleClearance={handleClearance} />
               </div>
          </div>


     )
}
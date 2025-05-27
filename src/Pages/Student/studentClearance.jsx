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
          <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
               <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Clearance</h1>
                    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 ">
                         <div className="max-w-6xl mx-auto">
                              <div className="bg-white shadow-lg rounded-lg p-6 relative z-0 mb-5">
                                   <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
                                        <Dropdown
                                             name="examName"
                                             value={examId}
                                             handleChange={handleInputChange}
                                             firstOption="Select exam name"
                                             options={exams}
                                             optionKey="id"
                                             optionValue="id"
                                             optionLabel="examName"
                                             mb="0"
                                             width="100%" // optional
                                        />

                                        <Submit
                                             className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
                                             loading={loading}
                                             isNotLoading="fetch"
                                             isloading="fetching...."
                                        />
                                   </form>

                              </div>
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
               </div>
          </div>

     )
}
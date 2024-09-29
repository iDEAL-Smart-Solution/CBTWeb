import { useEffect, useState } from "react";
import { useSubject } from "../../Zustand/subjectSlice";
import { useExam } from "../../Zustand/examSlice";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { Submit } from "../ReUsableComponents/input";
import { useQuestion } from "../../Zustand/questionSlice";
import { FileUploader } from "../ReUsableComponents/file";
import { useNotification } from "../../Context/notificationContext";

export default function BulkQuestionUploadingForm() {
     const { question, uploadBulkQuestion } = useQuestion();
     const { subject, fetchSubjectCodes } = useSubject();
     const { exam, fetchExamsLight } = useExam();
     const { loading } = question;

     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          examId: "",
          subjectCode: "",
          question: null,
     });
     const handleInputChange = (event) => {
          const { name, value, files } = event.target;
          let parsedValue = value;
          if (name === "question") {
               setFormData({
                    ...formData,
                    [name]: files[0]
               });
          } else {
               setFormData({
                    ...formData,
                    [name]: parsedValue
               });
          }
     }
     useEffect(() => {
          fetchSubjectCodes();
          fetchExamsLight();
     }, [])

     const { subjects } = subject;
     const { exams } = exam;

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               let res = await uploadBulkQuestion(formData);
               if(res.success) 
               {
                    showSuccess(res.message);
               } else {
                    showError(res.message);
               }
          } catch (_error) {
               showError(_error);
          }
     };
     const handleReset = async () => {
          setFormData({
               examId: "",
               subjectCode: "",
               question: null,
          })
     }
     return (
          <div className="page-center-2">
               <div className="register-box-3 box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
             
                         <div className="form-grouping">
                              <Dropdown
                                   name={`subjectCode`}
                                   value={formData.subjectCode}
                                   handleChange={handleInputChange}
                                   width={`100%`}
                                   firstOption={`Select subject code`}
                                   options={subjects}
                                   optionKey='id'
                                   optionValue='code'
                                   optionLabel='code'
                                   mb={`15px`}
                              />
                         </div>
                         <div className="form-grouping">
                              <Dropdown
                                   name={`examId`}
                                   value={formData.examId}
                                   handleChange={handleInputChange}
                                   width={`100%`}
                                   options={exams}
                                   optionKey='id'
                                   optionValue='id'
                                   firstOption={`Select Exam`}
                                   optionLabel='examName'
                                   mb={`15px`}

                              />
                         </div>
                         <div className="form-grouping">
                              <FileUploader
                                   className={``}
                                   name={`question`}
                                   handleChange={handleInputChange}
                                   width='100%'
                              />
                         </div>
                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
               </div>
          </div>

     )
}
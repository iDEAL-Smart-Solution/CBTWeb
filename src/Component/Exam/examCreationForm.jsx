import { useExam } from "../../Zustand/examSlice";
import { useState, useEffect } from "react";
import { InputField, Submit } from "../ReUsableComponents/input";
import { useSubject } from "../../Zustand/subjectSlice";
import examType from "../../lib/examTypeOption";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { useNotification } from "../../Context/notificationContext";

export default function ExamCreationForm() {
     const { exam, createExam } = useExam();
     const { subject, fetchSubjectsLight } = useSubject();
     const { loading } = exam;

     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          subjectCode: "",
          examType: 0,
          examName: "",
          NumberOfQuestionsPerStudent: 0,
          durationHours: 0,
          durationMinutes: 0,
          obtainableScore: 0,
     });

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          let parsedValue = value;
          setFormData({
               ...formData,
               [name]: parsedValue
          });
     };

     useEffect(() => {
          fetchSubjectsLight();
     }, []);

     const { subjects } = subject;

     const handleSubmit = async (e) => {
          e.preventDefault();

          const duration = `${String(formData.durationHours).padStart(2, '0')}:${String(formData.durationMinutes).padStart(2, '0')}:00`;

          const dataToSubmit = {
               ...formData,
               duration
          };

          try {
               let res = await createExam(dataToSubmit);
               if (res.success) {
                    showSuccess(res.message);
               } else {
                    showError(res.message)
               }
          } catch (_error) {
               console.log(_error);
          }
     };

     const handleReset = async () => {
          setFormData({
               subjectCode: "",
               examType: 0,
               examName: "",
               NumberOfQuestionsPerStudent: 0,
               durationHours: 0,
               durationMinutes: 0,
               ontainableScore: 0,
          });
     };

     return (
          <div className="page-center-2 ">
               <div className="register-box box-shadow">
                    <form onSubmit={handleSubmit} className="form">
                         <InputField
                              type="text"
                              name="examName"
                              value={formData.examName}
                              placeholder="Exam name e.g. ENG_JSS_1stCA_2ndTerm_2022/23"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              width={`97.5%`}
                         />

                         <Dropdown
                              name="subjectCode"
                              value={formData.subjectCode}
                              handleChange={handleInputChange}
                              width="100%"
                              firstOption="Select subject code"
                              options={subjects}
                              optionKey="id"
                              optionValue="code"
                              optionLabel="code"
                              mb="15px"
                         />

                         <Dropdown
                              name="examType"
                              value={formData.examType}
                              handleChange={handleInputChange}
                              width="100%"
                              firstOption="Select exam type"
                              options={examType}
                              optionKey="value"
                              optionValue="value"
                              optionLabel="text"
                              mb="15px"
                         />

                         <InputField
                              type="number"
                              name="NumberOfQuestionsPerStudent"
                              value={formData.NumberOfQuestionsPerStudent}
                              placeholder="Number of questions per student"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              label={`Number of question per student`}
                              width={`97.5%`}
                         />

                         <div className="duration-inputs">
                              <InputField
                                   type="number"
                                   name="durationHours"
                                   value={formData.durationHours}
                                   placeholder="Hours"
                                   className="register-long-field"
                                   handleChange={handleInputChange}
                                   min="0"
                                   label={`Time in hours e.g 01`}
                                   width={`97.5%`}

                              />
                              <InputField
                                   type="number"
                                   name="durationMinutes"
                                   value={formData.durationMinutes}
                                   placeholder="Minutes"
                                   className="register-long-field"
                                   handleChange={handleInputChange}
                                   min="0"
                                   max="59"
                                   label={`time in minutes e,g 30`}
                                   width={`97.5%`}

                              />
                         </div>
                         <InputField
                              type="number"
                              name="obtainableScore"
                              value={formData.obtainableScore}
                              placeholder="Obtainable Score"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              min="0"
                              max="100"
                              label={`Max obtainable Score for the exam`}
                              width={`97.5%`}

                         />

                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
               </div>
          </div>
     );
}

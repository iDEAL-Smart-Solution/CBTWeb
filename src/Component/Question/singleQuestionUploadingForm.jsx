import { InputField } from "../ReUsableComponents/input";
import { useEffect, useState } from "react";
import { useSubject } from "../../Zustand/subjectSlice";
import { useExam } from "../../Zustand/examSlice";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { Submit } from "../ReUsableComponents/input";
import { useQuestion } from "../../Zustand/questionSlice";
import { TextArea } from "../ReUsableComponents/textArea";
import { useNotification } from "../../Context/notificationContext";

export default function SingleQuestionUploadingForm() {
     const { question, uploadSingleQuestion } = useQuestion();
     const { subject, fetchSubjectCodes } = useSubject();
     const { exam, fetchExamNamesAndId } = useExam();
     const { loading } = question;
     const { showSuccess, showError } = useNotification();
     const [formData, setFormData] = useState({
          examId: "",
          subjectCode: "",
          questionInstruction: "",
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          answer: "",
          pointPerQuestion: 0,
          questionType: 0,
     });
     const handleInputChange = (event) => {
          const { name, value } = event.target;
          let parsedValue = value;
          setFormData({
               ...formData,
               [name]: parsedValue
          });
     }
     useEffect(() => {
          fetchSubjectCodes();
          fetchExamNamesAndId();
     }, [])

     const { subjects } = subject;
     const { exams } = exam;

     const queType = [
          { value: 1, text: 'OBJ' },
          { value: 2, text: 'Theory' },
     ]

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               let res = await uploadSingleQuestion(formData);
               if (res.success) {
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
               question: "",
               questionInstruction: "",
               optionA: "",
               optionB: "",
               optionC: "",
               optionD: "",
               answer: "",
               pointPerQuestion: 0,
               questionType: 0,
          })
     }
     return (
          <div className="page-center-2">
               <div className="register-box-3 box-shadow">
                    <small className="bold color-mute" >Note: when uploading thoery question, kindly skip the options and answers field</small>
                    <form onSubmit={handleSubmit} className="form" >
                         <div className="form-grouping-2">
                              <Dropdown
                                   name={`subjectCode`}
                                   value={formData.subjectCode}
                                   handleChange={handleInputChange}
                                   width={`50%`}
                                   firstOption={`Select subject code`}
                                   options={subjects}
                                   optionKey='id'
                                   optionValue='code'
                                   optionLabel='code'
                                   mb={`15px`}

                              />
                              <Dropdown
                                   name={`examId`}
                                   value={formData.examId}
                                   handleChange={handleInputChange}
                                   width={`50%`}
                                   options={exams}
                                   optionKey='id'
                                   optionValue='id'
                                   firstOption={`Select Exam`}
                                   optionLabel='examName'
                              />
                         </div>
                         <div className="form-grouping-2">
                              <Dropdown
                                   name={`questionType`}
                                   value={formData.questionType}
                                   handleChange={handleInputChange}
                                   width={`100%`}
                                   options={queType}
                                   optionKey='value'
                                   optionValue='value'
                                   firstOption={`Select Question type`}
                                   optionLabel='text'
                                   mb={`15px`}
                              />
                         </div>
                         <div className="form-grouping">
                              <TextArea name={`question`} value={formData.question} handleChange={handleInputChange} rows={3} className={`text-area`} placeholder={`Enter the question ...`} mb={`20px`} width={`100%`} ml={`10px`}
                              />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`questionInstruction`} value={formData.questionInstruction} placeholder={`Question Instruction`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`optionA`} value={formData.optionA} placeholder={`Option A`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`optionB`} value={formData.optionB} placeholder={`Option B`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`optionC`} value={formData.optionC} placeholder={`Option C`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`optionD`} value={formData.optionD} placeholder={`Option D`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`answer`} value={formData.answer} placeholder={`Correct Answer e.g option A or option B`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`number`} name={`pointPerQuestion`} value={formData.pointPerQuestion} placeholder={`quetion Points`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                         </div>
                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
               </div>
          </div>
     )
};
import { InputField } from "../ReUsableComponents/input";
import { useEffect, useState } from "react";
import { useSubject } from "../../Zustand/subjectSlice";
import { useExam } from "../../Zustand/examSlice";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { Submit } from "../ReUsableComponents/input";
import { useQuestion } from "../../Zustand/questionSlice";

export default function SingleQuestionUploadingForm() {
     const { question, uploadSingleQuestion } = useQuestion();
     const { subject, fetchSubjectsLight } = useSubject();
     const { exam, fetchExamsLight } = useExam();
     const { loading, message, errorMessage, setMessage, setErrorMessage } = question;
     const [formData, setFormData] = useState({
          examId: "",
          subjectCode: "",
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
          pointPerQuestion: 0,
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
          fetchSubjectsLight();
          fetchExamsLight();
     }, [])

     const { subjects } = subject;
     const { exams } = exam;

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               console.log(formData);
               // await uploadSingleQuestion(formData);
          } catch (_error) {
               console.log(_error);
          }
     };
     const handleReset = async () => {
          setFormData({
               examId: "",
               subjectCode: "",
               question: "",
               optionA: "",
               optionB: "",
               optionC: "",
               optionD: "",
               correctAnswer: "",
               pointPerQuestion: 0,
          })
          setMessage("");
          setErrorMessage("");
     }
     return (
          <div className="page-center-2">
               <div className="register-box box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
                    {/* <h1 className="color-primary text-center">Single Question Uploader</h1> */}
                         <div style={{ height: "5vh" }}>
                              {message && <p style={{ backgroundColor: "var(--primary-color)" }} className="color-light text-center bold">{message}</p>}
                              {errorMessage && <p style={{ backgroundColor: "var(--danger-color)" }} className="color-light text-center bold">{errorMessage}</p>}
                         </div>
                         <div className="form-grouping">
                              <Dropdown
                                   name={`subjectCode`}
                                   value={formData.subjectCode}
                                   handleChange={handleInputChange}
                                   width={`54%`}
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
                                   width={`54%`}
                                   options={exams}
                                   optionKey='id'
                                   optionValue='id'
                                   firstOption={`Select Exam`}
                                   optionLabel='examName'
                              />
                         </div>
                         <div className="form-grouping">
                         <InputField type={`text`} name={`question`} value={formData.question} placeholder={`type the question here ...`} className={`register-field`} handleChange={handleInputChange} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`optionA`} value={formData.optionA} placeholder={`option A`} className={`register-field`} handleChange={handleInputChange} />
                              <InputField type={`text`} name={`optionB`} value={formData.optionB} placeholder={`option B`} className={`register-field`} handleChange={handleInputChange} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`optionC`} value={formData.optionC} placeholder={`option C`} className={`register-field`} handleChange={handleInputChange} />
                              <InputField type={`text`} name={`optionD`} value={formData.optionD} placeholder={`option D`} className={`register-field`} handleChange={handleInputChange} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`correctAnswer`} value={formData.correctAnswer} placeholder={`Correct Answer e.g A or B`} className={`register-field`} handleChange={handleInputChange} />
                              <InputField type={`number`} name={`pointPerQuestion`} value={formData.pointPerQuestion} placeholder={`quetion Points`} className={`register-field`} handleChange={handleInputChange} />
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